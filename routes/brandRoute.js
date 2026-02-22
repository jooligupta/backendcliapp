const express = require("express");
const { createBrand, getBrands } = require('../controllers/brandController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { isAdmin } = require('../middleware/adminMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

const router = express.Router();

router.post("/", protect, isAdmin, upload.single('image'), createBrand);
router.get("/", getBrands);

module.exports = router;