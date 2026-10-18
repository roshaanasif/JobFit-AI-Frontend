import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});


export const loginUserApi = async ({ email, password }) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};


export const registerUserApi = async ({ name, email, password }) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};


export const logoutUserApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getmeApi = async () => {
  const response = await api.get("/auth/get-me");
  return response.data;
};