const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  name:      { type: String },
  createdAt: { type: Date, default: Date.now },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'Home' },
  isOwner: { type: Boolean, default: false },
  debt: { type: Number, default: 0 }
})

const homeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
})

const expenseSchema = new mongoose.Schema({
  category: { type: String, enum: ['Rent', 'Electricity', 'Gas', 'Utilities', 'Supplies', 'Groceries', 'Other'] },
  debtor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true }, 
  isPaid: { type: Boolean, default: false },
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'Home' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Home: mongoose.model('Home', homeSchema),
  Expense: mongoose.model('Expense', expenseSchema)
}
