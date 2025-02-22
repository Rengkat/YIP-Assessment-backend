const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (coords) {
          return coords.length === 2;
        },
        message: "Coordinates must be an array of two numbers [longitude, latitude].",
      },
    },
  },
});

// Index for geospatial queries
customerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Customer", customerSchema);
