import { config } from '../config.js'
import { requestWithTokenRetry } from './authService.js'

export async function getPosts() {
  console.log('Obteniendo feed');

  const response = await requestWithTokenRetry(`${config.serverUrl}/posts`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
  }
  const content = await response.json();
  return content.data;
}

