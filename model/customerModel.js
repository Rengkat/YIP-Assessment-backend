const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
});

// Index for geospatial queries
customerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Customer", customerSchema);
