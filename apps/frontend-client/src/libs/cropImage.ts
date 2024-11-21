// /libs/cropImage.ts

import { Area } from 'react-easy-crop';

export default async function getCroppedImg(imageSrc: string, crop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D context');
  }

  // Set canvas dimensions to cropped area dimensions
  canvas.width = crop.width;
  canvas.height = crop.height;

  // Draw the cropped image on the canvas
  ctx.drawImage(
    image,
    crop.x, // Start x-coordinate of the crop
    crop.y, // Start y-coordinate of the crop
    crop.width, // Width of the crop
    crop.height, // Height of the crop
    0, // Place it at the top-left of the canvas
    0,
    crop.width, // Fit the cropped width
    crop.height // Fit the cropped height
  );

  // Convert canvas to a Blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas is empty'));
      },
      'image/jpeg', // Image format
      1 // Quality level (1 is max)
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.crossOrigin = 'anonymous'; // Required for cross-origin images
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });
}
