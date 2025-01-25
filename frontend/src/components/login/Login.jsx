import React, { useState } from "react";
import style from "./login.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [type, setType] = useState("customer");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signup) {
      console.log(process.env.REACT_APP_API_URL);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          username,
          mobile,
          password,
          type,
        },
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
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          mobile,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
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
    }
  };
  return (
    <div className={style.container}>
      <h1>{signup ? "Register" : "Login"}</h1>
      <div>
        <form className={style.formClass}>
          {signup && (
            <input
              type="text"
              className={style.formInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
          )}
          <input
            type="number"
            className={style.formInput}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            style={{ appearance: "textfield" }}
          />
          <input
            type="password"
            className={style.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {/* {signup && (
            <div>
              <input
                type="radio"
                value="Business"
                name="type"
                onChange={(e) => setType(e.target.value)}
              />
              <label>Business</label>
              <input
                type="radio"
                value="Customer"
                name="type"
                onChange={(e) => setType(e.target.value)}
              />
              <label>Customer</label>
            </div>
          )} */}
          <button className={style.formButton} onClick={handleSubmit}>
            {signup ? "Sign up" : "Login"}
          </button>
          <div onClick={() => setSignup((prev) => !prev)}>
            {signup ? (
              <p className={style.formText}>Already have an account?</p>
            ) : (
              <p className={style.formText}>New User?</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
