import React, { useState } from "react";
import { Input, Button, message } from "antd";
import Navbar from "../../components/Navbar"; // Thay đường dẫn theo vị trí file Navbar
import styles from "./Register.module.css";
import registerImage from "../../assets/logo.png";
import AuthServices from "../../services/authServices";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmitRegister = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      const response = await AuthServices.registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      if (response && response.data) {
        message.success("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div>
      <Navbar active="register" /> {/* Thêm Navbar */}
      <div className={styles.register_card}>
        <img
          src={registerImage}
          alt="Register"
          className={styles.register_image}
        />
        <h4>Register</h4>
        <div className={styles.input_wrapper}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            size="large"
            className={styles.input}
          />
        </div>
        <div className={styles.input_wrapper}>
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            size="large"
            className={styles.input}
          />
        </div>
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
        <div className={styles.input_wrapper}>
          <Input.Password
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            size="large"
            className={styles.input}
          />
        </div>
        <Button
          disabled={
            !email || !password || !confirmPassword || !firstName || !lastName
          }
          type="primary"
          size="large"
          className={styles.register_btn}
          onClick={handleSubmitRegister}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Register;
