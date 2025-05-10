const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create category
exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Cette catégorie existe déjà" });
        }

        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(204).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};