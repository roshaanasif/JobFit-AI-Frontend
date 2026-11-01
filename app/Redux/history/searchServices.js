import api from "../../lib/axios";

export const searchOnHistoryApi = async ({ search, page, limit, filter }) => {
  const response = await api.post(
    "report/report-history/search",
    { search },
    { params: { filter, page, limit } }
  );
  return response.data;
};
