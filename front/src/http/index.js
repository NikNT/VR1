import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// export const sendOtp = (data) => api.post('/api/send-otp', data);

export const sendOtp = (data) =>
  axios
    .post("http://localhost:5500/api/send-otp", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    });

export const verifyOtp = (data) =>
  axios
    .post("http://localhost:5500/api/verify-otp", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    });

export const activate = (data) =>
  axios
    .post("http://localhost:5500/api/activate", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    });

export const logout = (data) =>
  axios
    .post("http://localhost:5500/api/logout", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    });

export const createRoom = (data) =>
  axios
    .post("http://localhost:5500/api/rooms", data, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    });

// export const getAllRooms = () => axios.get("http://localhost:5500/api/rooms");

export const getAllRooms = () => api.get("/api/rooms");

//Interceptors

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get("http://localhost:5500/api/refresh", {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default api;
