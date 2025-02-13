const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, 
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "menuItem", required: true },
      quantity: { type: Number, required: true, default: 1 },
    }
  ]
});

module.exports = mongoose.model("Cart", CartSchema);
