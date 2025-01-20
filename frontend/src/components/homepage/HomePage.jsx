import React, { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();
  const { mobile: businessMobile } = {mobile:"6305964802"};
  const { username, type, mobile } = useSelector((state) => state.user);
  const [isBusiness, setIsBusiness] = useState(type === "Business");
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const amt = customers.reduce(
      (acc, customer) => acc + customer.totalAmount,
      0
    );
    setAmount(amt);
  }, [customers]);

  useEffect(() => {
    if (!isBusiness) {
      async function getCustTransactions() {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/transaction/get/${mobile}/${businessMobile}`,
          { withCredentials: true }
        );
        console.log(res);
        setTransactions(res.data);
      }
      getCustTransactions();
    } else {
      async function getCustomers() {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/transaction/getCustomers/${businessMobile}`,
          { withCredentials: true }
        );
        console.log(res);
        setCustomers(res.data);
      }
      getCustomers();
    }
  }, [businessMobile, isBusiness, mobile]);

  const handleTakeCredit = async () => {
    navigate(`/amount/credit/${businessMobile}`);
  };

  const handlePayBack = async () => {
    navigate(`/amount/payback/${businessMobile}`);
  };

  const handleRemindClick = (transaction) => {
    const message = `Reminder: You have a transaction `;
    window.open(`https://wa.me/${transaction.mobile}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {isBusiness ? (
        <div className={styles.container}>
          <header className={styles.headerB}>
            <div className={styles.shopInfo}>
              <div className={styles.shopName}>{username}</div>
              <div className={styles.shopLocation}>location</div>
            </div>
          </header>

          <div className={styles.summary}>
            <div className={styles.summaryBox}>
              <p className={styles.label}>YOU GAVE</p>
              <p className={styles.amountRed}>{amount}</p>
            </div>
            <div className={styles.summaryBox}>
              <p className={styles.label}>YOU SHOULD GIVE</p>
              <p className={styles.amountGreen}>₹0</p>
            </div>
          </div>

          <div className={styles.customerList}>
            {customers.map((customer) => (
              <div key={customer.mobile} className={styles.customerRow} onClick={() => navigate(`/customer/${customer.mobile}`)}>
                <div className={styles.customerInfo}>
                  <div className={styles.avatar}></div>
                  <p className={styles.customerName}>{customer.username}</p>
                </div>
                <div className={styles.customerDetails}>
                  <p className={styles.amountRed}>₹{customer.totalAmount}</p>
                  <button className={styles.remindButton} onClick={() => handleRemindClick(customer)}>REMIND?</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>{username}</h1>
          <div className={styles.buttons}>
            <button className={styles.takeCredit} onClick={handleTakeCredit}>
              Take credit
            </button>
            <button className={styles.payBack} onClick={handlePayBack}>
              Pay Back
            </button>
          </div>
          <div className={styles.history}>
            <h3 className={styles.historyHeader}>History</h3>
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className={styles.historyItem}
                style={{
                  backgroundColor:
                    transaction.type === "credit" ? "green" : "red",
                }}
              >
                <p>{transaction.amount}</p>
                <p>
                  {new Date(transaction.date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}