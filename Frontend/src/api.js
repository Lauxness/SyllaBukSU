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
export const SendOTP = (email) => api.post("/account/otp", email);
export const GoogleLoginRequest = (code) =>
  api.post(`/account/login/google?code=${code}`);
export const VerifyOTP = (credentials) =>
  api.post("/account/verify", credentials);
export const FindAccount = (email) => api.post("/account/findAccount", email);
export const UpdatePassword = (credentials) =>
  api.post("/account/updatepassword", credentials);
export const GenerateDescription = (courseName) =>
  api.post("/generate/generate_description", courseName);
export const GenerateCourseOutcomes = (body) =>
  api.post("/generate/generate_cos", body);
export const GenerateLearningOutcomes = (body) =>
  api.post("/generate/generate_slos", body);
export const GenerateAll = (body) =>
  api.post("/generate/generate_allinone", body);
