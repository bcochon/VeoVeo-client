import { config } from '../config.js'
import { useAuthService } from './authService.js';

const useUserService = () => {
  const { requestWithTokenRetry } = useAuthService();

  async function getUserData(userId) {
    const response = await requestWithTokenRetry(
      `${config.serverUrl}/users/${userId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
    }
    const content = await response.json();
    return content.data;
  }

  async function searchUsers(query, page = undefined, limit = undefined) {
    const url = new URL(`${config.serverUrl}/users`);
    const searchParams = new URLSearchParams();
    if (query) searchParams.append('query', query);
    if (page) searchParams.append('page', page);
    if (limit) searchParams.append('limit', limit);

    const response = await requestWithTokenRetry(
      `${url.toString()}?${searchParams.toString()}`,
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

  return { getUserData, searchUsers };
}

export default useUserService;