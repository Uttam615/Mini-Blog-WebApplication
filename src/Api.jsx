import axios from "axios";

const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/apibackened/", // Django base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to dynamically set the token
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default Api;
