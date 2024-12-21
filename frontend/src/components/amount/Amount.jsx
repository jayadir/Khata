import React, { useState } from "react";
import style from "./amount.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Amount() {
  const user = useSelector((state) => state.user);
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState("");
  const { type,b } = useParams();
  const navigate=useNavigate();
  // const b=32;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post(`${process.env.REACT_APP_API_URL}/api/transaction/add`,{
        amount,
        desc:desc || "No Description",
        userMobile:user.mobile,
        type,
        businessMobile:b,
        userId:user.userId
      },{
        withCredentials:true
      })
      navigate("/business/"+b);
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className={style.container}>
      <h1 className={style.name}>Name</h1>
      <form>
        <input
          type="number"
          style={{ appearance: "textfield" }}
          value={amount}
          className={style.formInput}
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          className={style.formInput}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description (optional)"
        />
        <button className={style.formButton} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
