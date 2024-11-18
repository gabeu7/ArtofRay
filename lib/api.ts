import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Create base API instance
const api: AxiosInstance = axios.create({
	baseURL: process.env.API_URL,  // Use server-side env variable
	timeout: 10000,
	headers: {
	  'Content-Type': 'application/json',
	  'X-CSRF-Token': getCsrfToken(),  // Add CSRF protection
	},
	// Add request validation
	validateStatus: (status) => status >= 200 && status < 300,
  });
  
  // Add rate limiting
  import rateLimit from 'express-rate-limit';
  const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // limit each IP to 100 requests per windowMs
  });

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
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
    
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    api.post<T>(url, data, config).then(response => response.data),
    
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    api.put<T>(url, data, config).then(response => response.data),
    
  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    api.delete<T>(url, config).then(response => response.data)
};