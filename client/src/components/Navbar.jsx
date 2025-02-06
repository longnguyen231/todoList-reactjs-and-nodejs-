import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/logo.png"; // Thay bằng đường dẫn logo của bạn
import "./Navbar.css"; // Kết nối CSS
import getUserDetail from "../utils/GetUser";
import { message } from "antd";

function Navbar({ active }) {
  const [user, setUser] = useState(null); // Sử dụng null để kiểm tra trạng thái đăng nhập
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    const userDetails = getUserDetail();
    if (userDetails) {
      setUser(userDetails); // Lưu thông tin người dùng nếu đã đăng nhập
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("todoAppUser"); // Xóa thông tin người dùng khỏi localStorage
    setUser(null); // Đặt trạng thái người dùng thành null
    message.success("Logged out successfully!"); // Hiển thị thông báo thành công
    navigate("/"); // Chuyển hướng về trang Home
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <h4>DoDo</h4>
        </div>

        {/* Navigation Menu */}
        <ul className="navbar-menu">
          {/* Hiển thị menu dựa trên trạng thái đăng nhập */}
          {user ? (
            <>
              {/* My Task */}
              <li>
                <Link
                  to="/to-do-list"
                  className={active === "myTask" ? "activeNav" : ""}
                >
                  My Task
                </Link>
              </li>
              {/* Logout */}
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Home */}
              <li>
                <Link to="/" className={active === "home" ? "activeNav" : ""}>
                  Home
                </Link>
              </li>
              {/* Login */}
              <li>
                <Link
                  to="/login"
                  className={active === "login" ? "activeNav" : ""}
                >
                  Login
                </Link>
              </li>
              {/* Register */}
              <li>
                <Link
                  to="/register"
                  className={active === "register" ? "activeNav" : ""}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
