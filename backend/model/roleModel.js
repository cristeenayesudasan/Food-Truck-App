const mongoose = require('mongoose');

// Define the Roles Schema
const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true }, // e.g., 'admin', 'customer'
  description: { type: String, required: true } // Brief description of the role
});

// Create the Role Model
const RoleModel = mongoose.model('role', roleSchema);

module.exports = RoleModel;
