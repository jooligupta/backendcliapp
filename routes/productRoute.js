const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");
const upload = require('../middleware/uploadMiddleware.js');

const router = express.Router();

router.post(
  "/",
  protect,
  isAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },           // main images
    { name: "variationImages", maxCount: 20 }  // variation images
  ]),
  createProduct
);

// USER – Get products (pagination + filter + search)
router.get("/", getProducts);

// USER – Single product
router.get("/:id", getProductById);

module.exports = router;
