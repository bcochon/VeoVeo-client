import { config } from '../config.js'
import { requestWithTokenRetry } from './authService.js'

export async function getPost(postId) {
  const url = new URL(`${config.serverUrl}/posts/${postId}`);
  const response = await requestWithTokenRetry(url, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(
      `Servidor respondió ${response.status} ${response.statusText}`,
    );
  }
  return await response.json();
}

export async function getPosts({ page = 0, limit = 10, user, colorDay, color }) {
  const url = new URL(`${config.serverUrl}/posts`);
  const params = new URLSearchParams({ page, limit });
  if (user) params.append('user', user);
  if (colorDay) params.append('colorDay', colorDay);
  if (color) params.append("color", color);

  console.log(`Obteniendo feed ${`${url}?${params.toString()}`}...`);
  
  const response = await requestWithTokenRetry(`${url}?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
  }
  return await response.json();
}

export async function getDayPosts(colorDay, page = 0, limit = 10) {
  return await getPosts({ colorDay, page, limit });
}

export async function getUserPosts(user, page = 0, limit = 10) {
  return await getPosts({ user, page, limit });
}

export async function setLikePost(postId, newState = true) {
  const method = newState? 'POST' : 'DELETE';
  const response = await requestWithTokenRetry(`${config.serverUrl}/posts/${postId}/likes`, {
    method,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(
      `Servidor respondió ${response.status} ${response.statusText}`,
    );
  }
}

