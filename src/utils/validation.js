/**
 * Validation utility functions for order form inputs & file checks
 */

export function validateIndianMobile(mobile) {
  const cleaned = mobile.replace(/[\s\-\+\(\)]/g, "");
  // Standard 10 digit Indian mobile starting with 6, 7, 8, or 9
  const regex = /^[6-9]\d{9}$/;
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return regex.test(cleaned.slice(2));
  }
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return regex.test(cleaned.slice(1));
  }
  return regex.test(cleaned);
}

export function validatePincode(pincode) {
  const cleaned = pincode.trim();
  return /^\d{6}$/.test(cleaned);
}

export function validateEmail(email) {
  if (!email || email.trim() === "") return true; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export const ALLOWED_DESIGN_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/pdf"
];

export const ALLOWED_ID_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf"
];

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export function validateUploadedFile(file, allowedMimeTypes = ALLOWED_DESIGN_TYPES) {
  if (!file) return { isValid: false, error: "No file selected." };

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds ${MAX_FILE_SIZE_MB} MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`
    };
  }

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  const isTypeAllowed = allowedMimeTypes.includes(fileType) || 
    (fileType === "" && (fileName.endsWith('.pdf') || fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.webp')));

  if (!isTypeAllowed) {
    return {
      isValid: false,
      error: "Unsupported file format. Please upload PNG, JPG, JPEG, WEBP, or PDF."
    };
  }

  return { isValid: true, error: null };
}
