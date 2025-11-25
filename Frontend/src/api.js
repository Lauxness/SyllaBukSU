import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const token = userInfo?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token} `;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
export const ChatBot = (body) => api.post("/chat/chatbot", body);
export const GetDashboard = () => api.get("/admin/dashboard");
export const DownloadReport = (data) =>
  api.post("/admin/download_report", data, {
    responseType: "blob",
  });
export const SavePrompt = (body) => api.post("/prompts/save", body);
export const GetPrompts = () => api.get("/prompts/save");
export const GetPrompt = (id) => api.get(`/prompts/save/${id}`);
export const DeletePrompt = (id) => api.delete(`/prompts/delete/${id}`);
export const AddAnnouncement = (body) =>
  api.post("/announcement/announcements", body);
export const GetAnnouncement = () => api.get("/announcement/announcements");
export const GetOneAnnouncement = (id) =>
  api.get(`/announcement/announcements/${id}`);
export const DeleteAnnouncement = (id) =>
  api.delete(`/announcement/announcements/${id}`);
export const UpdateAnnouncement = (id, body) =>
  api.patch(`/announcement/announcements/${id}`, body);
export const AddDepartment = (email, body) =>
  api.patch(`/account/program/${email}`, body);
export const GetUser = (id) => api.get(`/users/user/${id}`);
export const GetCheckList = () => api.get("/checklist/");
export const AddCheckList = (data) => api.post("/checklist/", data);
export const UpdateChecklist = (id, data) =>
  api.patch(`/checklist/${id}`, data);
export const DeleteCheckList = (id) => api.delete(`/checklist/${id}`);
export const GetOneCheckList = (id) => api.get(`/checklist/${id}`);

export const GetDatasets = () => api.get(`/dataset/`);
export const AddDataset = (body) => api.post(`/dataset/`, body);
export const UpdateDataset = (body, id) => api.patch(`/dataset/${id}`, body);
export const DeleteDataset = (id) => api.delete(`/dataset/${id}`);
