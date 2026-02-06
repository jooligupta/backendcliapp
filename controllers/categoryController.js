const Category = require('../models/Category.js');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({
            name,
            slug: name.toLowerCase().replace(/ /g, "-")
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Categories fetched successfully",
            categories
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    getCategories
};
