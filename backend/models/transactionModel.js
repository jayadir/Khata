const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  userMobile: {
    type:String,
    required: true, 
  },
  businessMobile: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'payback'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String, 
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
