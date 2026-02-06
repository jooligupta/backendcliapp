const Attribute = require("../models/Attribute");

const createAttribute = async (req, res) => {
  const { name, values } = req.body;

  const attribute = await Attribute.create({
    name,
    values,
  });

  res.status(201).json(attribute);
};

const getAttributes = async (req, res) => {
  const data = await Attribute.find();
  res.json(data);
};

module.exports = { createAttribute, getAttributes };
