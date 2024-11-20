import axios, { AxiosRequestConfig } from 'axios';

// Function to get CSRF Token from cookies (assuming the token is in a cookie named 'csrf_token')
const getCsrfToken = () => {
  // Assuming the CSRF token is stored in a cookie
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrf_token='))
    ?.split('=')[1];

  return csrfToken;
};

// Create axios instance
const api = axios.create({
  baseURL: process.env.API_URL,  // API base URL from environment variable
  timeout: 10000,               // Timeout for requests
  headers: {
    'Content-Type': 'application/json',  // Set content type for API requests
  },
  validateStatus: (status) => status >= 200 && status < 300,  // Valid status codes for success
});

// Add request interceptor to attach CSRF token and auth token
api.interceptors.request.use(
  (config) => {
    // Get CSRF token from cookies (or some other storage)
    const csrfToken = getCsrfToken();

    // Add CSRF token to request header (if it exists)
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }

    // Optionally, add auth token (e.g., JWT) to request header
    const token = localStorage.getItem('token'); // or from a global state like Redux or Context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling unauthorized access (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access, such as redirecting to login
      // For example: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API Client (GET, POST, PUT, DELETE methods)
export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((response) => response.data),

  post: <T, D>(url: string, data?: D, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then((response) => response.data),

  put: <T, D>(url: string, data?: D, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((response) => response.data),
};
