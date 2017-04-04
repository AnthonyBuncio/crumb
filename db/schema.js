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
  houseId: { type: String }

})

const homeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
  
  members: [{ type: String, required: false }],
  maxExpenses: [{ type: String, required: false }],
  paidExpenses: [{ type: String, required: false }]
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Home: mongoose.model('Home', homeSchema)
}
