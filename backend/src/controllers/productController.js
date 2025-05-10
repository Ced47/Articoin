const Product = require('../models/Product');
const Category = require('../models/Category');
const {cloudinary} = require('../middlewares/cloudinaryUpload');


// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const categoryExist = await Category.exists({ _id: categoryId });
        if (!categoryExist) {
            return res.status(404).json({ message: "Cette catégorie n'existe pas" });
        }

        const products = await Product.find({ category: categoryId }).populate('category');
        if (!products) {
            return res.status(404).json({ message: "Aucun produit trouvé dans cette catégorie" });
        }

        res.status(200).json({ status: "success", data: { products } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products by each categories
exports.getProductsByCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({ message: "Aucune catégorie trouvée" });
        }

        const productsByCategories = await Promise.all(categories.map(async (category) => {
            const products = await Product.find({ category: category._id }).populate('category');
            return { category, products };
        }));

        res.status(200).json({ status: "success", data: { productsByCategories } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const categoryExist = await Category.exists({ _id: req.body.category });

        if (!categoryExist) {
            return res.status(400).json({ message: "Cette catégorie n'existe pas" });
        }

        const imagesUrls = [];
        if (req.files) {
            for (const file of req.files) {
                imagesUrls.push(file.path);
            }
        }

        const product = new Product({
            ...req.body,
            images: imagesUrls,
        });

        await product.save();
        res.status(201).json({ status: "success", data: { product } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;

        if (updates.category) {
            const categoryExist = await Category.exists({ _id: updates.category });

            if (!categoryExist) {
                return res.status(400).json({ message: "Cette catégorie n'existe pas" });
            }
        }

        const productExist = await Product.findById({ _id: productId });
        if (!productExist) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        const imagesUrls = [];
        if (req.files) {
            for (const file of req.files) {
                imagesUrls.push(file.path);
            }
        }

        updates.images = [...productExist.images, ...imagesUrls];

        const product = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true }).populate('category');

        res.status(200).json({ status: "success", data: { product } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const productExist = await Product.findById({ _id: productId });
        if (!productExist) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        if(productExist.images.length > 0) {
            const public_ids = []
            for (const image of productExist.images) {
                const public_id = image.split('/').slice(-2).join('/').split('.')[0];
                public_ids.push(public_id);
            };
            await cloudinary.api.delete_resources(public_ids);
        }

        await Product.findByIdAndDelete(productId);
        res.status(204).json({ status: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete product images
exports.deleteProductImages = async (req, res) => {
    try {
        const productId = req.params.id;
        const imagesToDelete = req.body.imagesUrls;

        const productExist = await Product.exists({ _id: productId });
        if (!productExist) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        const public_ids = []
        for (const image of imagesToDelete) {
            const public_id = image.split('/').slice(-2).join('/').split('.')[0];
            public_ids.push(public_id);
        };

        await cloudinary.api.delete_resources(public_ids);

        const product = await Product.findByIdAndUpdate(productId, { $pull: { images: { $in: imagesToDelete } } }, { new: true, runValidators: true }).populate('category');

        res.status(200).json({ status: "success", data: { product } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.adjustStock = async (req, res) => {
    try {
        const stock = req.body.stock;
        const productId = req.params.id;

        const productExist = await Product.exists({ _id: productId });
        if (!productExist) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        const product = await Product.findByIdAndUpdate(productId, { stock }, { new: true, runValidators: true }).populate('category');

        res.status(200).json({ status: "success", data: { product } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}