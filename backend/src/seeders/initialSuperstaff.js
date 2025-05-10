require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createFirstSuperstaff = async () => {
    await mongoose.connect("mongodb+srv://aia901:aiapass@taia901.cx1r4.mongodb.net/Articoin");

    const superstaffExists = await User.exists({ role: 'superstaff' });

    if (!superstaffExists) {
        
        const user = new User({
            name: 'admin',
            email: "admin@gmail.com",
            password: "admin_password",
            role: 'superstaff'
        });

        await user.save();

        console.log('Superstaff créé avec succès !');
    } else {
        console.log('Un superstaff existe déjà');
    }

    process.exit();
};

createFirstSuperstaff();

// node seeders/initialSuperstaff.js