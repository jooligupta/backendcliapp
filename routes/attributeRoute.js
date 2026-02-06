const express = require("express");
const { createAttribute, getAttributes } = require('../controllers/attributeController.js');
const { protect } = require('../middleware/authMiddleware.js');
const { isAdmin } = require('../middleware/adminMiddleware.js');

const router = express.Router();

router.post("/", protect,isAdmin,createAttribute);
router.get("/", getAttributes);

module.exports = router;