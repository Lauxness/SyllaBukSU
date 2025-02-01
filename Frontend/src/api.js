import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
export const Login = (credentials) => api.post("/account/login", credentials);
export const Register = (credentials) =>
  api.post("/account/register", credentials);
export const GoogleLoginRequest = (code) =>
  api.post(`/account/login/google?code=${code}`);
