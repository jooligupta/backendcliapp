const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      categoryId,
      subCategoryId,
      brandId,
      price,
      stock,
      description,
      attributes
    } = req.body;

    // collect uploaded images
    // const imagePaths = req.files.map(file => file.path);
    let imagePaths = [];
    if (req.files && req.files.images && Array.isArray(req.files.images)) {
      imagePaths = req.files.images.map(file => file.path);  // ✅ सही
    }

    const product = await Product.create({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      categoryId,
      subCategoryId,
      brandId,
      price,
      stock,
      description,
      images: imagePaths,
      attributes: attributes ? JSON.parse(attributes) : []
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// const getProducts = async (req, res) => {
//   const products = await Product.find()
//     .populate("categoryId", "name")
//     .populate("subCategoryId", "name")
//     .populate("brandId", "name");

//   res.json(products);
// };

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      subcatgory,
      brand,
      color,
      storage,
      minPrice,
      maxPrice
    } = req.query;

    const filter = {};

    // 🔍 Search
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // 📂 Category & Brand
    if (category) filter.categoryId = category;
    if (subcatgory) filter.subCategoryId = subcatgory;
    if (brand) filter.brandId = brand;

    // 💰 Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 🎨 Attribute filter
    const attrFilters = [];
    if (color) {
      attrFilters.push({ $elemMatch: { name: "Color", value: color } });
    }
    if (storage) {
      attrFilters.push({ $elemMatch: { name: "Storage", value: storage } });
    }
    if (attrFilters.length > 0) {
      filter.attributes = { $all: attrFilters };
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("categoryId", "name")
      .populate("subCategoryId", "name")
      .populate("brandId", "name");

    res.json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("categoryId", "name")
    .populate("subCategoryId", "name")
    .populate("brandId", "name");

  res.json(product);
};
module.exports = { createProduct, getProducts, getProductById };