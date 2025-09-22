import axios from 'axios';
import { BASE_URL } from './constant';
import { store } from '../Stores';
import { clearUser } from '../Stores/Slice/UserSlice';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const { token } = store.getState().user;
    if (!config?.url?.includes('login') && !config?.url?.includes('register')) {
      const authHeaderToken = token;
      if (authHeaderToken) {
        config.headers.Authorization = `Bearer ${authHeaderToken}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const code = error?.response?.status;
    if (code === 401) {
      store.dispatch(clearUser());
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };
