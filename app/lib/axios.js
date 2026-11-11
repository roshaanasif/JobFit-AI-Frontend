import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api",
  withCredentials: true,
});

let getAccessToken = null;
let dispatch = null;

export const setupAxios = ({ getToken, reduxDispatch }) => {
  getAccessToken = getToken;
  dispatch = reduxDispatch;
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken?.();
    const isRefreshRequest = config.url?.includes("/auth/refresh-token");

    if (token && !isRefreshRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const clearAuth = async () => {
  if (!dispatch) {
    return;
  }

  const { logout } = await import("../Redux/auth/authSlice");
  dispatch(logout());
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (
      requestUrl.includes("/auth/refresh-token") ||
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register")
    ) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      await clearAuth();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const response = await api.get("/auth/refresh-token");
      const newAccessToken = response.data?.token;

      if (!newAccessToken) {
        throw new Error("Refresh endpoint did not return an access token");
      }

      if (dispatch) {
        const { setAccessToken } = await import("../Redux/auth/authSlice");
        dispatch(setAccessToken(newAccessToken));
      }

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      await clearAuth();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
