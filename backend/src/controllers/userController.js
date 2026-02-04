const prisma = require('../config/db');

// @desc    Get all users (with optional role filtering)
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
    try {
        const where = req.query.role ? { role: req.query.role } : {};
        const users = await prisma.user.findMany({
            where,
            select: { id: true, name: true, email: true, role: true, createdAt: true } // Don't return passwords
        });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        next(err);
    }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id }
        });
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
