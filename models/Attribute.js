const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },

  slug: {
    type: String,
    lowercase: true
  },

  values: [{
    type: String
  }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Attribute", attributeSchema);