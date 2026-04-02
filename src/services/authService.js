import axios from "axios";
import axiosInstance from "./axiosInstance";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
// Login
export const loginApi = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/Auth/login`, {
    email,
    password,
  });
  return response.data;
};
 
// Refresh Token
export const refreshTokenApi = async (accessToken, refreshToken) => {
  const response = await axios.post(`${BASE_URL}/Auth/refresh`, {
    accessToken,
    refreshToken,
  });
  return response.data;
};
// Logoout
export const logoutApi = async (refreshToken) => {
  const response = await axiosInstance.post(`${BASE_URL}/Auth/logout`, { refreshToken });
  return response.data;
};