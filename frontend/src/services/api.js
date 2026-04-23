import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api"         // local url 
   baseURL: "https://task-manager-backend-x0k3.onrender.com"     //render url
});

// Auto attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;