// Centralized API config for frontend
// Use VITE_API_BASE_URL for cross-origin deployments; keep relative paths for dev proxy

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || ''

export function apiUrl(path: string): string {
  if (!path) return API_BASE_URL || ''
  const p = path.startsWith('/') ? path : `/${path}`
  // If API_BASE_URL is empty, return relative URL for dev proxy or same-origin
  return `${API_BASE_URL}${p}`
}
