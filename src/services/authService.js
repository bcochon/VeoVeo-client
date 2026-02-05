import { Capacitor } from "@capacitor/core";
import { useAuth } from "../context/AuthContext";
import { config } from "../config";

export const useAuthService = () => {
  const { getAccessToken, refreshAccessToken } = useAuth();

  function isCapacitor() {
    return Capacitor.isNativePlatform();
  }

  const requestAuthenticated = async (input, init = {}) => {
    const accessToken = await getAccessToken().catch(err => console.error(err));
    if (accessToken) {
      const authHeader = { Authorization: `Bearer ${accessToken}` };
      init.headers = init.headers
        ? {
            ...init.headers,
            ...authHeader,
          }
        : authHeader;
    } else {
      console.warn('Se llamará sin autenticar a:', input)
    }
    
    return await fetch(input, init);
  };

  const requestWithTokenRetry = async (input, init = {}) => {
    const response = await requestAuthenticated(input, init);

    if (response.status === 401 && isCapacitor()) {
      console.log("Refrescando token...");
      await refreshAccessToken();
      return await requestAuthenticated(input, init);
    }

    return response;
  };

  async function getProfile() {
    const response = await requestWithTokenRetry(
      `${config.serverUrl}/auth/profile`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
    }
    const content = await response.json();
    return content?.data;
  }

  async function signUp(username, email) {
    const registrationDto = { username }
    if (email) registrationDto.email = email;

    const response = await requestWithTokenRetry(
      `${config.serverUrl}/auth/register`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationDto),
      },
    );
    if (!response.ok) {
      throw new Error(
        `Servidor respondió ${response.status} ${response.statusText}`,
      );
    }
    const content = await response.json();
    return content?.data;
  }

  return { requestWithTokenRetry, getProfile, signUp };
};
