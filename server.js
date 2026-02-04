const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const medicineRoutes = require("./routes/medicineRoute.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/medicine", medicineRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});