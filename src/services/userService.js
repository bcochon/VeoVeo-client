import { config } from '../config.js'

export async function getUserData(userId) {
  // const response = await fetch(`${config.serverUrl}/users/${userId}`, {
  //   method: 'GET',
  //   credentials: 'include',
  // });
  // if (!response.ok) {
  //   throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
  // }
  // const content = await response.json();
  // return content.data;
  return { id: userId };
}