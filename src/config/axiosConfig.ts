import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://192.168.1.13:8000/api',
});

export default api;
