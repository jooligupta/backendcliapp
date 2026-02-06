const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try {
        // Check if userId exists (from protect middleware)
        if (!req.userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Find user by ID from database
        const user = await User.findById(req.userId);
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if user is admin - compare with uppercase 'ADMIN'
        if (user.role !== 'ADMIN') {  // Changed from 'admin' to 'ADMIN'
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        // Attach user to request for any subsequent handlers
        req.user = user;
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { isAdmin };