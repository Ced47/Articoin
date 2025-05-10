const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const BACK_URL = process.env.BACK_URL;

// Register user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "L'utilisateur existe déja" });
        }

        user = new User({
            name,
            email,
            password,
            role,
        });

        await user.save();

        res.status(201).json({ message: "L'utilisateur a été créé" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        // Create a payload for the JWT
        const payload = {
            user: {
                id: user._id,
                role: user.role
            },
        };

        // Sign the JWT
        jwt.sign(payload, jwtSecret, { expiresIn: '24h' }, (err, token) => {
            // Remove the password from the user object
            user.password = undefined;
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ status: "success", access_token: token, user: user })
        });

    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

// Logout user
exports.logout = async (req, res) => {
    res.clearCookie('token');
    // res.clearCookie('user');
    res.status(200).json({ status: "success" });
}