const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const subCategoryRoutes = require("./routes/subCategoryRoute.js");
const brandRoutes = require("./routes/brandRoute.js");
const attributeRoutes = require("./routes/attributeRoute.js");
const productRoutes = require("./routes/productRoute.js");
const orderRoutes = require("./routes/orderRoute.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();
app.use(express.json()); // 🔥 REQUIRED
app.use(express.urlencoded({ extended: true })); // (s


app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});