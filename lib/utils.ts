import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const getCsrfToken = (): string | null => {
  // Retrieve CSRF token from cookies (adjust logic if you're storing it somewhere else)
  const token = document.cookie.split('; ').find(row => row.startsWith('csrfToken='));
  return token ? token.split('=')[1] : null;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
