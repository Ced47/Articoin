const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;