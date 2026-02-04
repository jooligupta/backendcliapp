const Medicine = require("../models/Medicine.js");

const getMedicines = async (req, res) => {
    const medicines = await Medicine.find();
    res.json(medicines);
};

const addMedicine = async (req, res) => {
    const medicine = await Medicine.create(req.body);
    res.json(medicine);
};

module.exports = { getMedicines, addMedicine };