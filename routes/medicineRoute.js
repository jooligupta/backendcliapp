const express = require("express");
const { getMedicines, addMedicine } = require("../controllers/medicineController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getMedicines);
router.post("/", protect, addMedicine);

module.exports = router;