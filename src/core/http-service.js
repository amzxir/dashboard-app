import axios from "axios";

const BASE_URL = "https://react-mini-projects-api.classbon.com";

export const HttpService = axios.create({
  baseURL: BASE_URL,
});

export const HttpInterCeptoredService = axios.create({
  baseURL: BASE_URL,
});

HttpInterCeptoredService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

HttpInterCeptoredService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (response.data.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
