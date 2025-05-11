const express = require('express');
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');
const { uploadImages } = require('../middlewares/cloudinaryUpload');

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/category/:id', productController.getProductsByCategory);
router.get('/products/categories', productController.getProductsByCategories);
router.get('/product/:id', productController.getProduct);
router.post('/product', uploadImages, productController.createProduct);
router.put('/product/:id', uploadImages, productController.updateProduct);
router.put('/product/stock/:id', productController.adjustStock);
router.delete('/product/:id', uploadImages, productController.deleteProduct);
router.delete('/product/images/:id', uploadImages, productController.deleteProductImages);

module.exports = router;