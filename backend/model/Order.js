const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "menuItem", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  status: { type: String, enum: ["preparing", "out for delivery"], default: "preparing" },
  riderPhone: { type: String, default: null }, // Rider contact number
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
