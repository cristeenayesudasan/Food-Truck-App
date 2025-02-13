const mongoose = require('mongoose');

// Define the Users Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  mobileNo: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password_hash: { type: String, required: true }, 
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'role', required: true }, 
  createdTime: { type: Date, default: Date.now }, 
  status: { type: String, default: 'active' } 
});



// Create the User Model
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
