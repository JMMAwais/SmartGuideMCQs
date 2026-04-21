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
// Forgot Password
export const forgotPasswordApi = async (email) => {
  const response = await axios.post(`${BASE_URL}/Auth/forgot-password`, JSON.stringify(email), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const createUser = async (userData) => {
  const res = await axiosInstance.post(`${BASE_URL}/Auth/register-user`, userData);
  return res.data;
};

export const getMyPermissions = async () => {
  const res = await axiosInstance.get("/Auth/my-permissions");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axiosInstance.post("/Auth/get-all-users");
  return res.data;
};