import axios from "axios";

const SERVER_URL = "http://localhost:5000/api"; // URL của server API

const registerUser = (data) => {
  return axios.post(`${SERVER_URL}/register`, data); // Sửa lại cú pháp
};

const loginUser = (data) => {
  return axios.post(`${SERVER_URL}/login`, data); // Endpoint chính xác cho login
};

const AuthServices = {
  loginUser,
  registerUser,
};

export default AuthServices;
