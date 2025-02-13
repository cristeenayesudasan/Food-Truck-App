const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  nutritionalValues: {
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    fats: { type: Number, required: true },
    fiber: { type: Number, required: true },
  },
  dietTags: { type: [String], required: true },
  price: { type: Number, required: true },
  allergyInfo: { type: String, required: true },
  availability: { type: Boolean, default: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("menuItem", menuItemSchema);
