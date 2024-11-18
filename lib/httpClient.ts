import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import axiosCookieJarSupport from 'axios-cookiejar-support';

// Create cookie jar
const jar = new CookieJar();

// Create client with cookie support
import { CookieJar } from 'tough-cookie';
import { encrypt, decrypt } from './encryption';  // Add encryption

const jar = new CookieJar(undefined, {
  rejectPublicSuffixes: true,
  allowSpecialUseDomain: false
});

const client = axios.create({
  withCredentials: true,
  jar,
  headers: {
    'X-CSRF-Token': getCsrfToken(),
  },
  // Add cookie security options
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
});

// Add token encryption
const encryptToken = (token: string) => encrypt(token);
const decryptToken = (token: string) => decrypt(token);

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