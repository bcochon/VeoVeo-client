import { config } from '../config.js'
import { useAuthService } from './authService.js';

const useColorService = () => {
  const { requestWithTokenRetry } = useAuthService();

  async function getTodayColor() {
    console.log('Obteniendo color del día');

    const response = await fetch(`${config.serverUrl}/color-days/today`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
    }
    const content = await response.json();
    return content.data;
  }

  async function getColor(id) {
    if (!id) return null;
    console.log(`Obteniendo datos del color ${id}`);

    const response = await requestWithTokenRetry(
      `${config.serverUrl}/colors/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(
        `Servidor respondió ${response.status} ${response.statusText}`,
      );
    }
    const content = await response.json();
    return content.data;
  }

  async function getColors(page, limit) {
    const url = new URL(`${config.serverUrl}/colors`);
    const searchParams = new URLSearchParams();
    if (page) searchParams.append("page", page);
    if (limit) searchParams.append("limit", limit);
  
    const response = await fetch(`${url.toString()}?${searchParams.toString()}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(
        `Servidor respondió ${response.status} ${response.statusText}`,
      );
    }
    const content = await response.json();
    return content.data;
  }

  return { getTodayColor, getColor, getColors };
}

export default useColorService;
