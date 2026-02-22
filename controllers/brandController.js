const Brand = require('../models/Brand.js');

const createBrand = async (req, res) => {
    const { name } = req.body;

    const brand = await Brand.create({ name ,
         image: req.file ? req.file.path : null
    });

    res.json(brand);
};

const getBrands = async (req, res) => {
    const brands = await Brand.find();
    res.json(brands);
};
module.exports = { createBrand, getBrands };