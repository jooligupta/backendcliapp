const express = require("express");
const { createSubCategory, getSubCategories } = require("../controllers/subCategoryController.js");
const upload = require('../middleware/uploadMiddleware.js');
const router = express.Router();

router.post("/", upload.single('image'), createSubCategory);
router.get("/", getSubCategories);

module.exports = router;