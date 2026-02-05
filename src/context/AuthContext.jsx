import { createContext, useCallback, useEffect, useState, useContext } from 'react';
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";
import { Browser } from "@capacitor/browser";
import { jwtDecode } from "jwt-decode";

import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0() || {};

  const [accessToken, setAccessToken] = useState(null);
  const [userMobile, setUserMobile] = useState(null);
  const [isAuthenticatedMobile, setIsAuthenticatedMobile] = useState(false);
  const [isLoadingMobile, setIsLoadingMobile] = useState(true);

  const [loginModal, setLoginModal] = useState({ isOpen: false });

  const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;
  const REDIRECT_URI = "com.veoveo.app://callback";

  const REFRESH_KEY = "refresh_token";
  const USER_KEY = "user_data";
  const PKCE_KEY = "pkce_verifier";

  const generatePKCE = async () => {
    const verifier = crypto.randomUUID() + crypto.randomUUID();
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return { verifier, challenge };
  };

  const loginMobile = async () => {
    const { verifier, challenge } = await generatePKCE();
    await SecureStoragePlugin.set({
      key: PKCE_KEY,
      value: verifier,
    });

    const url =
      `https://${import.meta.env.VITE_AUTH0_DOMAIN}/authorize?` +
      new URLSearchParams({
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: "openid profile email offline_access",
        audience: AUTH0_AUDIENCE,
        code_challenge: challenge,
        code_challenge_method: "S256",
      });
    await Browser.open({ url });
  };

  const handleTokens = async (tokens) => {
    console.log(`Los tokens son:`, JSON.stringify(tokens));
    if (!tokens?.access_token) throw new Error(`No se obtuvo access token`);

    await SecureStoragePlugin.set({
      key: REFRESH_KEY,
      value: tokens?.refresh_token,
    });

    setAccessToken(tokens?.access_token);

    const decodedUser = tokens?.id_token ? jwtDecode(tokens.id_token) : {};
    setUserMobile(decodedUser);

    setIsAuthenticatedMobile(true);

    console.log("Autenticación exitosa");
  };

  const getTokensFromCode = useCallback(async (code) => {
    try {
      const { value: codeVerifier } = await SecureStoragePlugin.get({
        key: PKCE_KEY,
      });
      if (!codeVerifier) throw new Error("No se encontró PKCE verifier");

      const response = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "authorization_code",
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            code,
            redirect_uri: "com.bondialerta.app://callback",
            code_verifier: codeVerifier,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`El servidor devolvió: ${response.status} ${error}`);
      }

      const tokens = await response.json();
      await handleTokens(tokens);
    } catch (err) {
      console.error("Error obteniendo tokens de acceso desde código:", err);
      await logoutMobile();
    }
  }, []);

  const logoutMobile = async () => {
    console.log("Cerrando sesión...");
    setIsAuthenticatedMobile(false);
    setAccessToken(null);
    setUserMobile(null);
    await SecureStoragePlugin.remove({ key: REFRESH_KEY }).catch((err) =>
      console.error("Error borrando refresh token:", err),
    );
    await SecureStoragePlugin.remove({ key: USER_KEY }).catch((err) =>
      console.error("Error borrando user data:", err),
    );
  };

  const completelyLogoutMobile = async () => {
    await logoutMobile();
    const url =
      `https://${import.meta.env.VITE_AUTH0_DOMAIN}/v2/logout?` +
      new URLSearchParams({
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
        returnTo: REDIRECT_URI,
      });
    await Browser.open({ url });
  };

  const refreshTokens = useCallback(async () => {
    try {
      const refreshToken = await SecureStoragePlugin.get({
        key: REFRESH_KEY,
      });

      const response = await fetch(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/oauth/token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grant_type: "refresh_token",
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            refresh_token: refreshToken?.value,
          }),
        },
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`El servidor devolvió: ${response.status} ${error}`);
      }

      const tokens = await response.json();
      await handleTokens(tokens);
      return tokens;
    } catch (err) {
      console.error(`Error refrescando tokens de acceso:`, err);
      await logoutMobile();
    }
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const handler = App.addListener("appUrlOpen", async ({ url }) => {
      if (!url.startsWith(REDIRECT_URI)) return;
      const code = new URL(url).searchParams.get("code");
      if (!code) return;

      await Browser.close();
      await getTokensFromCode(code);
    });

    return () => handler.remove();
  }, [getTokensFromCode]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const load = async () => {
        try {
          setIsLoadingMobile(true);
          if (accessToken && isAuthenticatedMobile) return;
          await refreshTokens();
        } catch (err) {
          console.error("Error autenticando usuario:", err);
        } finally {
          setIsLoadingMobile(false);
        }
      };
      load();
    }
  }, [accessToken, isAuthenticatedMobile, refreshTokens]);


  const openLoginModal = () => {
    setLoginModal({
      isOpen: true,
      onClose: () => {setLoginModal({ isOpen: false })},
      title: 'Iniciá sesión',
      message: '¡Creá tu cuenta o accedé para poder publicar fotos, seguir usuarios y mucho más!',
      cancelText: "Descartar",
      variant: "info",
      confirmText: "Acceder"
    });
  }

  if (Capacitor.isNativePlatform())
    return (
      <AuthContext.Provider
        value={{
          loginModal,
          openLoginModal,
          user: userMobile,
          isAuthenticated: isAuthenticatedMobile,
          loading: isLoadingMobile,
          getAccessToken: () => accessToken,
          loginWithRedirect: loginMobile,
          logout: completelyLogoutMobile,
        }}
      >
        {children}
      </AuthContext.Provider>
    );

  return (
    <AuthContext.Provider
      value={{
        loginModal,
        openLoginModal,
        user,
        isAuthenticated,
        loading: isLoading,
        getAccessToken: getAccessTokenSilently,
        loginWithRedirect,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}