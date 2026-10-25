import api from "../../lib/axios";

export const KpiUserApi = async () => {
  const response = await api.get("/dashboard/KPI");
  return response.data;
};


export const recentUserReportApi = async ({ id, recent }) => {
  const response = await api.get(`/report/report-history/${id}`,{params: {recent}});
  return response.data;
};


