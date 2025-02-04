const ToDo = require("../models/ToDo"); // Import model ToDo
const mongoose = require("mongoose");

// Tạo mới một ToDo
const createToDo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Kiểm tra dữ liệu hợp lệ
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    if (!req.user?.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing user information" });
    }

    // Tạo mới ToDo
    const todo = new ToDo({
      title,
      description,
      createdBy: req.user.id, // Dùng id từ token đã giải mã
    });

    const result = await todo.save();
    res.status(201).json({ message: "Created New Task", todo: result });
  } catch (error) {
    console.error("Error creating ToDo:", error);
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả ToDo của user của ID trên URL
const getToDos = async (req, res) => {
  try {
    // Lấy thông tin phân trang từ query params (mặc định page = 1, limit = 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit; // Tính số tài liệu cần bỏ qua

    // Lấy danh sách ToDos với phân trang
    const todos = await ToDo.find({ createdBy: req.user.id })
      .skip(skip)
      .limit(limit);

    // Tính tổng số lượng ToDo
    const totalTodos = await ToDo.countDocuments({ createdBy: req.user.id });

    // Tính tổng số trang
    const totalPages = Math.ceil(totalTodos / limit);

    // Trả về kết quả
    res.status(200).json({
      todos,
      pagination: {
        currentPage: page,
        totalPages,
        totalTodos,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching ToDos:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};


// Lấy chi tiết ToDo theo ID
const getToDoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const todo = await ToDo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error fetching ToDo by ID:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedToDo = await ToDo.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedToDo) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", todo: updatedToDo });
  } catch (error) {
    console.error("Error updating ToDo:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedToDo = await ToDo.findByIdAndDelete(id);

    if (!deletedToDo) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting ToDo:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Xuất tất cả các phương thức trong toDoController
module.exports = {
  createToDo,
  getToDos,
  getToDoById,
  updateToDo,
  deleteToDo,
};
