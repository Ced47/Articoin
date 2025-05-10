const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        users.forEach(user => {
            user.password = undefined;
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        user.password = undefined;

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update user
exports.updateUser = async (req, res) => {
    const updates = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Check if password is being updated
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        updatedUser.password = undefined;

        res.status(200).json({ status: "success", data: {updatedUser}});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.clearCookie('token');

        res.status(204).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
