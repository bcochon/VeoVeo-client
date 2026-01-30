import { config } from '../config.js'

export async function getTodayColor() {
  console.log('Obteniendo feed');

  const response = await fetch(`${config.serverUrl}/color-days-today`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
  }
  const content = await response.json();
  return content.data;
}

