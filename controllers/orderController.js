const Order = require("../models/Order");

const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        let totalAmount = 0;

        items.forEach(item => {
            totalAmount += item.price * item.quantity;
        });

        const order = await Order.create({
            user: req.user._id, // from protect middleware
            items,
            shippingAddress,
            totalAmount
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder };
