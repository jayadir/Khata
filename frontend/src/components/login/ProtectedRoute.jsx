import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import { setUser } from "../../redux/userSlice";
import Layout from "../layout/Layout";
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const accessTkn = getCookie("accessTkn");
  const refreshTkn = getCookie("refreshTkn");
  // console.log(accessTkn, refreshTkn);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user);
    console.log(accessTkn, refreshTkn);
    if (!user) {
      if (refreshTkn) {
        console.log("refreshing token");
        async function fetchData() {
          try {
            const res = await axios.post(
              "http://localhost:5000/api/auth/refresh",
              {},
              {
                withCredentials: true,
              }
            );
            console.log(res);
            if (res.status === 200 || res.status === 201) {
              dispatch(
                setUser({
                  username: res.data.username,
                  mobile: res.data.mobile,
                  type: res.data.type,
                  userId: res.data.userId,
                })
              );
              navigate("/");
            } else {
              alert(res.data.message);
            }
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      } else {
        navigate("/login");
      }
    }
  }, [user, navigate]);
  return user ? <Layout>{children}</Layout> : <Login />;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  // console.log(value, parts);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
