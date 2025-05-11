const express = require('express');
const producterController = require('../controllers/producterController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/producters', authorize('staff', 'superstaff') , producterController.getProducters);
router.get('/producter/:id', authorize('staff', 'superstaff'), producterController.getProducter);
router.get('/producter/product/:id', authorize('staff', 'superstaff'), producterController.getProductsByProducter);
router.post('/producter', authorize('staff', 'superstaff'), producterController.createProducter);
router.put('/producter/:id', authorize('staff', 'superstaff'), producterController.updateProducter);
router.delete('/producter/:id', authorize('staff', 'superstaff'), producterController.deleteProducter);

module.exports = router;