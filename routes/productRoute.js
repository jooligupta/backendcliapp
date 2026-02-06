const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

const router = express.Router();

// ADMIN – Create product
router.post("/", protect, isAdmin, createProduct);

// USER – Get products (pagination + filter + search)
router.get("/", getProducts);

// USER – Single product
router.get("/:id", getProductById);

module.exports = router;
