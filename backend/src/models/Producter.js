const mongoose = require('mongoose');

const ProducterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
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

ProducterSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

ProducterSchema.pre('updateOne', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Producter', ProducterSchema);