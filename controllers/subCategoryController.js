const SubCategory = require("../models/SubCategory");

const createSubCategory = async (req, res) => {
    try {
        console.log("BODY 👉", req.body); // 🔍 DEBUG

        const { name, category } = req.body;

        const subCategory = await SubCategory.create({
            name,
            category
        });

        res.status(201).json(subCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSubCategory };


const getSubCategories = async (req, res) => {
    const data = await SubCategory.find().populate("category", "name");
    res.json(data);
};
module.exports = { createSubCategory, getSubCategories };