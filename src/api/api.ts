import axios from 'axios';

export const API_URL = 'http://localhost:8080';
export const LOCAL_STORAGE_KEY = 'eisenhower';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
