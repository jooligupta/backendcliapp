const Attribute = require("../models/Attribute");

// CREATE ATTRIBUTE
const createAttribute = async (req, res) => {
  try {
    const { name, values, category } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Attribute name is required" });
    }

    // slug generate
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    // check duplicate inside same category
    const existing = await Attribute.findOne({ name, category });
    if (existing) {
      return res.status(400).json({ message: "Attribute already exists" });
    }

    const attribute = await Attribute.create({
      name,
      slug,
      values: values || [],
      category
    });

    res.status(201).json(attribute);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL ATTRIBUTES
const getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().populate("category", "name");
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAttribute,
  getAttributes
};