import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './axiosConfig';

const apiRequestHandler = async (options: AxiosRequestConfig): Promise<AxiosResponse> => {
  return api.request(options);
};

export default apiRequestHandler;
