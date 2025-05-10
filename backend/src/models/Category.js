const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

CategorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

CategorySchema.pre('updateOne', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Category', CategorySchema);