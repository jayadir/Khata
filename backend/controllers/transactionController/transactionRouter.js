const express = require("express");
const router = express.Router();
const controller = require("./transactionController");
router.post("/add", controller.createTransaction);
router.get("/get/:mobile/:businessMobile", controller.getTransactions);
router.get("/getCustomers/:mobile", controller.getCustomers);
router.post("/getCustomerTransaction", controller.getSingleCustomerTransactions);
module.exports = router;