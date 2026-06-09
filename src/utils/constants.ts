/**
 * Shared constants for PrepForge.
 */
export const APP_NAME = "PrepForge";

export const ROLE_HOME: Record<string, string> = {
  Student: "/dashboard",
  College: "/college/dashboard",
  Recruiter: "/recruiter/dashboard",
  Admin: "/admin/dashboard",
};

export const MAX_AVATAR_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
