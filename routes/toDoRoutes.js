const express = require("express");
const {
  createToDo,
  getToDos,
  getToDoById,
  updateToDo,
  deleteToDo,
} = require("../controllers/toDoController");
const authentication = require("../middleware/authJWT");

const router = express.Router();

router.post("/create-to-do", authentication, createToDo); // Tạo ToDo
router.get("/get-all", authentication, getToDos); // Lấy danh sách ToDos
router.get("/:id", authentication, getToDoById); // Lấy chi tiết ToDo
router.put("/:id", authentication, updateToDo); // Cập nhật ToDo
router.delete("/:id", authentication, deleteToDo); // Xóa ToDo

module.exports = router;
