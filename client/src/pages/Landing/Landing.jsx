import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import landingImage2 from "../../assets/landing2.png";
function Landing() {
  return (
    <div className={styles.container}>
      {<Navbar active="home" />}
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>DoTo</h1>
      </nav>

      {/* Main Content */}
      <div className={styles.landing_wrapper}>
        {/* Text Section */}
        <div className={styles.landing_text}>
          <h1 className={styles.mainHeading}>
            Schedule Your Daily Tasks With{" "}
            <span className={styles.primaryText}>DoTo</span>
          </h1>
          <p className={styles.subText}>
            A simple and effective way to organize your daily tasks and improve
            productivity.
          </p>
          <div className={styles.btnWrapper}>
            <Link to="/register" className={styles.primaryBtn}>
              Register
            </Link>
            <Link to="/login" className={styles.secondaryBtn}>
              Login
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.landing_img}>
          <img
            src={landingImage2}
            alt="Organize Tasks"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
