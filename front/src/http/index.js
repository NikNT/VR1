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

export default api;
