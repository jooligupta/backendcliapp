const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController.js");
const { protect } = require('../middleware/authMiddleware.js');
const { isAdmin } = require('../middleware/adminMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');


const router = express.Router();

router.post("/", protect, isAdmin, upload.single('image'),createCategory);
router.get("/", protect, getCategories);
router.put("/:id", protect, isAdmin,upload.single('image'), updateCategory);
router.delete("/:id", protect, isAdmin, deleteCategory);

module.exports = router;