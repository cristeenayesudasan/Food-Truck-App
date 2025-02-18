const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Location", LocationSchema);
