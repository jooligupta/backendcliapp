const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        category: String,
        price: Number,
        stock: Number,
        prescriptionRequired: Boolean,
        image: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);