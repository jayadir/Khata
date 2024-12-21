import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import axios from "axios";
import Cookies from "js-cookie";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = async () => {
    console.log("Logged out!");
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(setUser(null));
    // Cookies.remove("accessTkn");
    // Cookies.remove("refreshTkn");
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        {isLoggedIn ? (
          <>
            <button
              onClick={handleHomeClick}
              className={styles.button}
              style={{ backgroundColor: "#ff5722", color: "white" }}
            >
              Home
            </button>
            <button onClick={handleLogoutClick} className={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <p className={styles.info}>Please log in</p>
        )}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
