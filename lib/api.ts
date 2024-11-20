import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCsrfToken } from './utils';  // You can keep this import if you need any utility functions for CSRF, though it's not directly needed in axios setup.

// Create base API instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,  // Use server-side env variable
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // No need to set CSRF token here directly
  validateStatus: (status) => status >= 200 && status < 300,
});

// Request interceptor for attaching CSRF token to every request
api.interceptors.request.use(
  async (config) => {
    // Fetch CSRF token from cookies or from the server-side CSRF token API endpoint
    const csrfToken = await getCsrfToken(); // This function can be used to fetch the token from cookies or other storage

    // Add CSRF token to request headers
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Add auth token if exists (this is useful for authenticated requests)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

// API methods
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    api.get<T>(url, config).then(response => response.data),
    
  post: <T, D>(url: string, data?: D, config?: AxiosRequestConfig) => 
    api.post<T>(url, data, config).then(response => response.data),
    
  put: <T, D>(url: string, data?: D, config?: AxiosRequestConfig) => 
    api.put<T>(url, data, config).then(response => response.data),
    
  delete: <T, D>(url: string, config?: AxiosRequestConfig) => 
    api.delete<T>(url, config).then(response => response.data)
};
