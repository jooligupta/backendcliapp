const express = require("express");
const{ createCategory, getCategories } = require("../controllers/categoryController.js");
const {protect} = require('../middleware/authMiddleware.js');
const{isAdmin} = require('../middleware/adminMiddleware.js');


const router = express.Router();

router.post("/",protect,isAdmin, createCategory);
router.get("/",protect, getCategories);

module.exports = router;