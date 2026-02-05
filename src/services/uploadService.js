import { config } from "../config.js";
import { useAuthService } from "./authService.js";

const useUploadService = () => {
  const { requestWithTokenRetry } = useAuthService();
  
  function dataURLtoBlob(dataURL) {
    const [header, base64] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];

    const binary = atob(base64);
    const array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    return new Blob([array], { type: mime });
  }

  function compressImage(
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

  async function getSignature() {
    console.log("Obteniendo signature del servidor...");
    const response = await requestWithTokenRetry(
      `${config.serverUrl}/uploads/signature`,
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
    console.log("Signature obtenida del servidor");
    return content.data;
  }

  async function uploadToCloudinary(blob, formData) {
    console.log("Cargando imagen en CDN...");
    const builtFormData = new FormData();
    builtFormData.append("file", blob, "new_post.jpg");
    builtFormData.append("api_key", formData?.apiKey);
    if (formData?.timestamp)
      builtFormData.append("timestamp", formData?.timestamp);
    if (formData?.signature)
      builtFormData.append("signature", formData?.signature);
    if (formData?.publicId) builtFormData.append("public_id", formData?.publicId);
    if (formData?.folder) builtFormData.append("folder", formData?.folder);

    const url = `${import.meta.env.VITE_CLOUDINARY_URL}/${formData?.cloudName}/image/upload`;
    const response = await fetch(url, {
      method: "POST",
      body: builtFormData,
    });

    if (!response.ok) {
      throw new Error(
        `Cloudinary respondió ${response.status} ${response.statusText}`,
      );
    }
    console.log("Imagen subida a CDN");

    return await response.json();
  }

  async function createPost(blob, colorDay, description = null) {
    if (!colorDay?.id)
      throw new Error(
        `No se proporcionó color del día válido para crear publicación`,
      );
    const colorDayId = colorDay?.id;

    const formData = await getSignature();
    const cloudinaryData = await uploadToCloudinary(blob, formData);

    console.log("Creando publicación en servidor...");
    const newPostDto = {
      colorDayId,
      media: {
        publicId: cloudinaryData?.public_id,
        width: cloudinaryData?.width,
        height: cloudinaryData?.height,
        mimeType: `${cloudinaryData?.resource_type}/${cloudinaryData?.format}`,
      },
    };
    if (description) newPostDto.description = description;

    console.log("DTO:", newPostDto);

    const response = await requestWithTokenRetry(`${config.serverUrl}/posts`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostDto),
    });

    if (!response.ok) {
      throw new Error(
        `Servidor respondió ${response.status} ${response.statusText}`,
      );
    }
    console.log("Publicación creada en servidor");

    const content = await response.json();
    return content.data;
  }

  return {
    dataURLtoBlob,
    compressImage,
    createPost,
  }
}

export default useUploadService;
