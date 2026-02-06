const express = require("express");
const { createOrder } = require('../controllers/orderController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { isAdmin } = require('../middleware/adminMiddleware.js');

const router = express.Router();

router.post("/", protect, isAdmin, createOrder);
// router.get("/", getBrands);

module.exports = router;