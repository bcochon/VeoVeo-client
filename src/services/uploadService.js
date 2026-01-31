import { config } from '../config.js'
import { requestWithTokenRetry } from './authService.js'

// export async function getPosts() {
//   console.log('Obteniendo feed');

//   const response = await requestWithTokenRetry(`${config.serverUrl}/posts`, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   if (!response.ok) {
//     throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
//   }
//   const content = await response.json();
//   return content.data;
// }

export function dataURLtoBlob(dataURL) {
  const [header, base64] = dataURL.split(",");
  const mime = header.match(/:(.*?);/)[1];

  const binary = atob(base64);
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new Blob([array], { type: mime });
}

export function compressImage(
  dataUrl,
  {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.7, // 0 → 1
    mimeType = "image/jpeg",
  } = {},
) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // Maintain aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // 🔥 Compression happens here
      const compressedDataUrl = canvas.toDataURL(mimeType, quality);

      resolve(compressedDataUrl);
    };
  });
}