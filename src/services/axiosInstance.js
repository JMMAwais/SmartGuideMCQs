import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor — har request mein token attach karo
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor — 401 aaye to refresh karo
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 aaya aur ye retry nahi hai
    if (error.response?.status === 401 && !originalRequest._retry) {

      // Agar pehle se refresh ho raha hai to queue mein dalo
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedAccess = localStorage.getItem("accessToken");
      const storedRefresh = localStorage.getItem("refreshToken");

      // ✅ Tokens exist nahi karte to login pe bhejo
      if (!storedAccess || !storedRefresh) {
        processQueue("No tokens", null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // ✅ Plain axios use karo — infinite loop se bachne ke liye
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/Auth/refresh`,
          {
            accessToken: storedAccess,
            refreshToken: storedRefresh,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // ✅ Response structure handle karo
        const tokenData = res.data?.data?.token ?? res.data?.token ?? res.data;
        const newAccessToken = tokenData?.accessToken;
        const newRefreshToken = tokenData?.refreshToken;

        if (!newAccessToken) {
          throw new Error("Access token not found in refresh response");
        }

        // ✅ Tokens update karo
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        // Refresh fail — logout karo
        processQueue(refreshError, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;