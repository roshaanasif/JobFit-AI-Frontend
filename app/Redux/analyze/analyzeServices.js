import api from "../../lib/axios";

export const generatingAiResponseApi = async (formData) => {
  const response = await api.post("/report/", formData);
  return response.data;
};


// export const registerUserApi = async ({ name, email, password }) => {
//   const response = await api.post("/auth/register", { name, email, password });
//   return response.data;
// };


// export const logoutUserApi = async () => {
//   const response = await api.post("/auth/logout");
//   return response.data;
// };

// export const getmeApi = async () => {
//   const response = await api.get("/auth/get-me");
//   return response.data;
// };