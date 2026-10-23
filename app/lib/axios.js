import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api",

  withCredentials: true,
});

let getAccessToken = null;
let dispatch = null;

export const setupAxios = ({
  getToken,
  reduxDispatch,
}) => {
  getAccessToken = getToken;
  dispatch = reduxDispatch;
};


// ---------------------------------------------
// REQUEST INTERCEPTOR
// ---------------------------------------------

api.interceptors.request.use(
  (config) => {

    const token = getAccessToken?.();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ---------------------------------------------
// REFRESH CONTROL
// ---------------------------------------------

let isRefreshing = false;

let failedQueue = [];


const processQueue = (error, token = null) => {

  failedQueue.forEach((promise) => {

    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }

  });

  failedQueue = [];
};


// ---------------------------------------------
// RESPONSE INTERCEPTOR
// ---------------------------------------------

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // Only handle 401
    if (
      error.response?.status !== 401 ||
      !originalRequest
    ) {
      return Promise.reject(error);
    }


    // Don't refresh the refresh request
    if (
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }


    // Prevent infinite retry
    if (originalRequest._retry) {

      if (dispatch) {
        // We'll handle logout here later
      }

      return Promise.reject(error);
    }


    originalRequest._retry = true;


    // ---------------------------------------------
    // Another request is already refreshing
    // ---------------------------------------------

    if (isRefreshing) {

      return new Promise((resolve, reject) => {

        failedQueue.push({
          resolve,
          reject,
        });

      })
        .then((newToken) => {

          originalRequest.headers.Authorization =
            `Bearer ${newToken}`;

          return api(originalRequest);

        })
        .catch((err) => {

          return Promise.reject(err);

        });
    }


    // ---------------------------------------------
    // Start refresh
    // ---------------------------------------------

    isRefreshing = true;


    try {

      const response = await api.post(
        "/auth/refresh"
      );


      const newAccessToken =
        response.data.token;


      if (!newAccessToken) {
        throw new Error(
          "No access token returned from refresh endpoint"
        );
      }


      // Tell Redux about new token
      if (dispatch) {

        const {
          setAccessToken,
        } = await import(
          "@/redux/auth/authSlice"
        );

        dispatch(
          setAccessToken(newAccessToken)
        );
      }


      // Resolve waiting requests
      processQueue(
        null,
        newAccessToken
      );


      // Retry original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;


      return api(originalRequest);


    } catch (refreshError) {

      processQueue(
        refreshError,
        null
      );


      return Promise.reject(
        refreshError
      );

    } finally {

      isRefreshing = false;

    }
  }
);


export default api;