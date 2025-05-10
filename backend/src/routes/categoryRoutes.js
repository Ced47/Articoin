const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();
router.use(authenticate);

router.get('/categories', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.put('/category/:id', authorize('superstaff'), categoryController.updateCategory);
router.delete('/category/:id', authorize('superstaff'), categoryController.deleteCategory);

module.exports = router;