const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();
router.use(authenticate);

router.get('/category', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;