"use client";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Generate UploadThing helpers for use in React components
const { uploadFiles } = generateReactHelpers<OurFileRouter>();

/**
 * Uploads an image file using UploadThing and returns the resulting URL
 *
 * This function uses UploadThing's `uploadFiles` utility to send a file to the
 * configured `imageUploader` route defined in the UploadThing file router.
 *
 * In production, this ensures proper storage handling (e.g., UploadThing to S3 or another service).
 *
 * @param file - The image file to be uploaded
 * @returns Promise that resolves to the uploaded image URL
 *
 * @throws Error if the upload fails or no URL is returned
 *
 * @example
 * const imageUrl = await uploadImage(selectedFile);
 * quill.insertEmbed(cursorIndex, 'image', imageUrl);
 */
export async function uploadImage(file: File): Promise<string> {
  try {
    // Upload file using the "imageUploader" route from your file router
    const res = await uploadFiles("imageUploader", { files: [file] });

    // Retrieve the URL of the uploaded image
    const imageUrl = res?.[0]?.ufsUrl;
    if (!imageUrl) throw new Error("Uploadthing did not return a URL");

    return imageUrl;
  } catch (err) {
    // Log error for debugging and rethrow to caller
    console.error("Image upload failed:", err);
    throw err;
  }
}
