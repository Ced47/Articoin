const Producter = require('../models/Producter');
const Product = require('../models/Product');

// Get all producters
exports.getProducters = async (req, res) => {
    try {
        const producters = await Producter.find();
        res.status(200).json(producters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products by producter
exports.getProductsByProducter = async (req, res) => {
    try {
        const producterId = req.params.id;
        const producterExist = await Producter.exists({ _id: producterId });

        if (!producterExist) {
            return res.status(404).json({ message: "Ce producteur n'existe pas" });
        }

        const products = await Product.find({ producter: producterId }).populate('producter');
        if (!products) {
            return res.status(404).json({ message: "Aucun produit trouvé pour ce producteur" });
        }

        res.status(200).json({ status: "success", data: { products } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single producter
exports.getProducter = async (req, res) => {
    try {
        const producter = await Producter.findById(req.params.id);
        if (!producter) {
            return res.status(404).json({ message: "Producteur non trouvé" });
        }
        res.status(200).json(producter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create producter
exports.createProducter = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingProducter = await Producter.findOne({ name });

        if (existingProducter) {
            return res.status(400).json({ message: "Producteur existe déja" });
        }

        const producter = new Producter({ name, description });
        await producter.save();

        res.status(201).json({ status: "success", data: { producter } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update producter
exports.updateProducter = async (req, res) => {
    try {
        const producterId = req.params.id;
        const updates = req.body;

        const producter = await Producter.findByIdAndUpdate(producterId, updates, { new: true });
        if (!producter) {
            return res.status(404).json({ message: "Producteur non trouvé" });
        }

        res.status(200).json({ status: "success", data: { producter } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete producter
exports.deleteProducter = async (req, res) => {
    try {
        const producter = await Producter.findByIdAndDelete(req.params.id);
        if (!producter) {
            return res.status(404).json({ message: "Producteur non trouvé" });
        }
        res.status(204).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};