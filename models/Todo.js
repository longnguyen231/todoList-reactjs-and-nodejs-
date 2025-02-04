const mongoose = require("mongoose");

const { Schema } = mongoose;

const toDoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false, // Mặc định là chưa hoàn thành
    },
    completedOn: {
      type: Date, // Chuyển sang kiểu Date để chuẩn hóa
      default: null, // Mặc định là null nếu chưa hoàn thành
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Liên kết với model User
      required: true, // Bắt buộc phải có người tạo
    },
  },
  {
    timestamps: true, // Thêm createdAt và updatedAt tự động
  }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;
