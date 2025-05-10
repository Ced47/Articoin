const express = require('express');
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middlewares/auth');
const { uploadImages } = require('../middlewares/cloudinaryUpload');

const router = express.Router();
router.use(authenticate);

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);
router.post('/product', uploadImages, productController.createProduct);
router.put('/product/:id', uploadImages, authorize('superstaff'), productController.updateProduct);
router.put('/product/stock/:id', authorize('superstaff'), productController.adjustStock);
router.delete('/product/:id', uploadImages, authorize('superstaff'), productController.deleteProduct);
router.delete('/product/images/:id', uploadImages, authorize('superstaff'), productController.deleteProductImages);

module.exports = router;