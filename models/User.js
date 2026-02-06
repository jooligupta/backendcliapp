const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    isVerified: { type: Boolean, default: false }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);