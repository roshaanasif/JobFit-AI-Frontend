import api from "../../lib/axios";

export const generatingAiResponseApi = async (formData) => {
  const response = await api.post("/report/", formData);
  return response.data;
};


export const singleReportApi = async ({ id }) => {
  const response = await api.get(`/report/${id}`);
  return response.data;
};


