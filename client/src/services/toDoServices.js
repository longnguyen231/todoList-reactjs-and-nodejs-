import axios from "axios";
import  getUserDetail  from "../utils/GetUser";

// URL gốc cho API
const SERVER_URL = "http://localhost:5000/api/todo";

// Hàm lấy headers kèm token
const authHeaders = () => {
  const userToken = getUserDetail()?.user.token;
  return {
    headers: {
      Authorization: `Bearer ${userToken}`, // Định dạng chuẩn Bearer token
    },
  };
};

// Hàm tạo ToDo mới
const createToDo = async (data) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/create-to-do`,
      data,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating ToDo:", error);
    throw error;
  }
};

// Hàm cập nhật ToDo
const updateToDo = async (id, data) => {
  try {
    const response = await axios.put(
      `${SERVER_URL}/${id}`,
      data,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating ToDo:", error);
    throw error;
  }
};

// Hàm lấy tất cả ToDos
const getToDos = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/get-all`, authHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching ToDos:", error);
    throw error;
  }
};

// Hàm lấy ToDo theo ID
const getToDoById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${id}`, authHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching ToDo by ID:", error);
    throw error;
  }
};

// Hàm xóa ToDo
const deleteToDo = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${id}`, authHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting ToDo:", error);
    throw error;
  }
};

// Tập hợp các dịch vụ ToDo
const ToDoServices = {
  createToDo,
  updateToDo,
  getToDos,
  getToDoById,
  deleteToDo,
};

export default ToDoServices;
