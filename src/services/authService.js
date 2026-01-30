import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Capacitor } from '@capacitor/core';

function isCapacitor() {
  return Capacitor.isNativePlatform();
}

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

async function setCapacitorSecrets(secrets) {
  if (secrets?.accessToken)
    await SecureStoragePlugin.set({
      key: ACCESS_KEY,
      value: secrets?.accessToken,
    });

  if (secrets?.refreshToken)
    await SecureStoragePlugin.set({
      key: REFRESH_KEY,
      value: secrets?.refreshToken,
    });
}

export async function requestWithTokenRetry(input, init = {}) {
  if (isCapacitor()) {
    const accessToken = await SecureStoragePlugin
      .get({ key: ACCESS_KEY })
      .catch((err) => {
        console.error('No se pudo obtener el access token de Secure Storage', err);
        return null;
      });
    const authHeader = { Authorization: `Bearer ${accessToken.value}` };
    if (accessToken?.value)
      init.headers = init.headers ? {
        ...init.headers,
        ...authHeader,
      } : authHeader;
  }
  const response = await fetch(input, init);

  if (response.status === 401) {
    console.log('Refrescando token...');
    if (isCapacitor()) {
      const refreshToken = await SecureStoragePlugin
        .get({ key: REFRESH_KEY })
        .catch((err) => {
          console.error('No se pudo obtener el refresh token de Secure Storage', err);
          return null;
        });
      const response = await fetch(new URL(`${import.meta.env.VITE_SERVER_URL}/auth/refresh`), {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken.value }),
      });
      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);
      const responseData = await response.json();
      await setCapacitorSecrets({ accessToken: responseData?.data?.access_token });
    }
    else {
      await fetch(new URL(`${import.meta.env.VITE_SERVER_URL}/auth/refresh`), {
        method: 'POST',
        credentials: 'include',
      });
    }
    return await fetch(input, init);
  }

  return response;
}

export async function login(username, password) {
  const url = new URL(`${import.meta.env.VITE_SERVER_URL}/auth/login`);

  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);

  const responseData = await response.json();

  if (isCapacitor()) {
    await setCapacitorSecrets({
      accessToken: responseData?.data?.access_token,
      refreshToken: responseData?.data?.refresh_token,
    });
  }
}

export async function logout() {
  const url = new URL(`${import.meta.env.VITE_SERVER_URL}/auth/logout`);

  const response = await requestWithTokenRetry(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok)
    throw new Error(
      `Error cerrando sesión: ${response.status} ${response.statusText}`,
    );

  if (isCapacitor()) {
    await SecureStoragePlugin.remove({ key: "access_token" });
    await SecureStoragePlugin.remove({ key: "refresh_token" });
  }
}

export async function getProfile() {
  const url = new URL(`${import.meta.env.VITE_SERVER_URL}/auth/profile`);

  const response = await requestWithTokenRetry(url, {
    credentials: "include",
  });

  if (!response.ok)
    throw new Error(
      `Error obteniendo perfil: ${response.status} ${response.statusText}`,
    );

  return (await response.json())?.data;
}
