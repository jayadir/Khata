const transaction = require("../../models/transactionModel");
const mongoose = require("mongoose");
exports.createTransaction = async (req, res) => {
  try {
    const { userMobile, businessMobile, type, amount, description,userId } = req.body;
    
    const newTransaction = new transaction({
      userMobile,
      businessMobile,
      type,
      amount,
      description,
      userId
    });
    await newTransaction.save();
    res
      .status(201)
      .json({ message: "Transaction created successfully", newTransaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  const { mobile } = req.params;
  try {
    const transactions=await transaction.find({userMobile:mobile});
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  const { mobile } = req.params;
  try {
    const transactions=await transaction.find({businessMobile:mobile}).populate('userId');
    const customers=transactions.map(transaction=>{
      return {
        username:transaction?.userId?.username,
        mobile:transaction?.userId?.mobile,
        totalAmount:transaction.amount
      }
    });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


