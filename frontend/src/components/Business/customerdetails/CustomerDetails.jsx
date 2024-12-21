import React from "react";
import styles from "./CustomerDetails.module.css";

export default function CustomerDetails() {
  const transactions = [
    { amount: 3456, date: "26 NOV 2024", time: "3:40PM", type: "gave" },
    { amount: 3456, date: "26 NOV 2024", time: "3:40PM", type: "shouldGive" },
    { amount: 3456, date: "26 NOV 2024", time: "3:40PM", type: "gave" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatar}></div>
        <div>
          <p className={styles.customerName}>CUSTOMER 1</p>
          <p className={styles.customerPhone}>+91 6305964802</p>
        </div>
      </header>

      <div className={styles.transactions}>
        {transactions.map((transaction, index) => (
          <div key={index} className={styles.transactionRow}>
            <div
              className={
                transaction.type === "gave"
                  ? styles.amountBoxRed
                  : styles.amountBoxGreen
              }
            >
              ₹{transaction.amount}
            </div>
            <div className={styles.transactionInfo}>
              <p>{transaction.date}</p>
              <p>{transaction.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
