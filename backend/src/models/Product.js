const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
        min: 0,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    images: [
        {
            type: String,
            required: false,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

ProductSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

ProductSchema.pre('updateOne', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Product', ProductSchema);