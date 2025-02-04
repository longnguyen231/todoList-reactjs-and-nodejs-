const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const authRouter = require("./routes/authRoutes");
const toDoRouter = require("./routes/toDoRoutes");



require("dotenv").config();

const app = express();

// Cổng mà server sẽ chạy
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app;
// Route API documentation với Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Định tuyến cho authentication
app.use("/api", authRouter);
app.use("/api/todo", toDoRouter);
// Kết nối MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
