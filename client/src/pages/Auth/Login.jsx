import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Thay đường dẫn theo vị trí file Navbar
import styles from "./Login.module.css";
import loginImage from "../../assets/logo.png";
import AuthServices from "../../services/authServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra nếu người dùng đã đăng nhập
  useEffect(() => {
    const existingToken = localStorage.getItem("todoAppUser");
    if (existingToken) {
      message.info("You are already logged in!");
      navigate("/to-do-list");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      const data = { email, password };
      const response = await AuthServices.loginUser(data);

      if (response.data && response.data.user.token) {
        localStorage.setItem("todoAppUser", JSON.stringify(response.data));
        message.success("Login successful!");
        navigate("/to-do-list");
      } else {
        message.error("Invalid email or password");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Server error. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar active="login" /> {/* Thêm Navbar */}
      <div className={styles.login_card}>
        <img src={loginImage} alt="Login" className={styles.login_image} />
        <h4>Login</h4>
        <div className={styles.input_wrapper}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            className={styles.input}
          />
        </div>
        <div className={styles.input_wrapper}>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
            className={styles.input}
          />
        </div>
        <div className={styles.input_info}>
          New user? <a href="/register">Register</a>
        </div>
        <Button
          loading={loading}
          disabled={!email || !password}
          type="primary"
          size="large"
          className={styles.login_btn}
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
