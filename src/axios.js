import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL,
});

// при любом запросе проверяем наличие токена
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
