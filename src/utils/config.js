/**
 * Get the base path for the application
 * This is set during the build process from VITE_BASE_PATH env var
 */
export const getBasePath = () => {
  return import.meta.env.VITE_BASE_PATH || "/";
};

/**
 * Get the base URL for the application
 * This is set during the build process from VITE_BASE_URL env var
 */
export const getBaseURL = () => {
  return import.meta.env.VITE_BASE_URL || "";
};
