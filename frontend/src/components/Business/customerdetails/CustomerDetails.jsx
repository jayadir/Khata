import React, { useEffect, useState } from "react";
import styles from "./CustomerDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
export default function CustomerDetails() {
  const user = useSelector((state) => state.user);
  const { mobile } = useParams();
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    async function getCustomerTransactions() {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/transaction/getCustomerTransaction`,
        {
          customerMobile: mobile,
          businessMobile: 32,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setTransactions(res.data);
    }
    getCustomerTransactions();
  }, [mobile]);
  // const transactions = [
  //   { amount: 3456, date: "26 NOV 2024", time: "3:40PM", type: "gave" },
  //   { amount: 3456, date: "26 NOV 2024", time: "3:40PM", type: "shouldGive" },
  //   { amount: 3456, date: "26 NOV 2024", time: "3:40PM", type: "gave" },
  // ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatar}></div>
        {transactions && (
          <div>
            <p className={styles.customerName}>
              {transactions[0]?.userId?.username}
            </p>
            <p className={styles.customerPhone}>
              {transactions[0]?.userId?.mobile}
            </p>
          </div>
        )}
      </header>

      <div className={styles.transactions}>
        {transactions?.map((transaction, index) => (
          <div key={index} className={styles.transactionRow}>
            <div
              className={
                transaction.type === "credit"
                  ? styles.amountBoxRed
                  : styles.amountBoxGreen
              }
            >
              ₹{transaction.amount}
            </div>
            <div className={styles.transactionInfo}>
              {new Date(transaction.date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
