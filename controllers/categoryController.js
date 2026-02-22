const Category = require('../models/Category.js');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = await Category.create({
            name,
            slug: name.toLowerCase().replace(/ /g, "-"),
            image: req.file ? req.file.path : null
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const{page=1, limit=10,search} = req.query;
        const filter={};
        if(search){
            filter.name={$regex:search, $options:"i"};
        }
        const total = await Category.countDocuments(filter);
        const categories = await Category.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        res.status(200).json({
            message: "Categories fetched successfully",
            categories,
            success:true,
            page:Number(page),
            total,
            totalPages:Math.ceil(total/limit),

        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name || category.name;
        category.slug = name ? name.toLowerCase().replace(/ /g, "-") : category.slug;

        if (req.file) {
            category.image = req.file.path;
        }

        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            await category.deleteOne();
            res.json({ message: "Category removed" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};
