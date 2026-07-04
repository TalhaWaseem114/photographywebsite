/**
 * Cloudinary Unsigned Upload Utility
 * Uses the client-side API to upload images directly to Cloudinary
 * without exposing sensitive API Secrets on the client.
 */

const CLOUD_NAME = "vpjtwcbt";
const DEFAULT_PRESET = "hanzala_preset";

export async function uploadToCloudinary(file, uploadPreset = DEFAULT_PRESET) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || "Failed to upload image to Cloudinary");
    }

    const data = await res.json();
    return data.secure_url; // Return the secure HTTPS URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary upload utility error:", error);
    throw error;
  }
}
