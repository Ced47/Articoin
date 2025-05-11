const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/category', authenticate, categoryController.createCategory);
router.put('/category/:id', authenticate, authorize('superstaff'), categoryController.updateCategory);
router.delete('/category/:id', authenticate, authorize('superstaff'), categoryController.deleteCategory);

module.exports = router;