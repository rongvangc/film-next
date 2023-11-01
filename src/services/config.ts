import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_READ_TOKEN}`,
  },
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
