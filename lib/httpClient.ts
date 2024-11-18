import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import axiosCookieJarSupport from 'axios-cookiejar-support';

// Create cookie jar
const jar = new CookieJar();

// Create client with cookie support
const client = axios.create({
  withCredentials: true,
  jar
});

axiosCookieJarSupport(client);

export const httpClient = {
  async get(url: string) {
    try {
      const response = await client.get(url);
      return response.data;
    } catch (error) {
      console.error('HTTP Client Error:', error);
      throw error;
    }
  },

  async post(url: string, data: any) {
    try {
      const response = await client.post(url, data);
      return response.data;
    } catch (error) {
      console.error('HTTP Client Error:', error);
      throw error;
    }
  }
};