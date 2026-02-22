const SubCategory = require("../models/SubCategory");

const createSubCategory = async (req, res) => {
    try {  
      
        const { name, category } = req.body;

        const subCategory = await SubCategory.create({
            name,
            category,
            image: req.file ? req.file.path : null
        });

        res.status(201).json(subCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const getSubCategories = async (req, res) => {
    const data = await SubCategory.find().populate("category", "name");
    res.json(data);
};
module.exports = { createSubCategory, getSubCategories };