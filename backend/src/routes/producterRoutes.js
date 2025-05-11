const express = require('express');
const producterController = require('../controllers/producterController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/producters', authenticate, authorize('staff', 'superstaff') , producterController.getProducters);
router.get('/producter/:id', authenticate, authorize('staff', 'superstaff'), producterController.getProducter);
router.get('/producter/product/:id', authenticate, authorize('staff', 'superstaff'), producterController.getProductsByProducter);
router.post('/producter', authenticate, authorize('staff', 'superstaff'), producterController.createProducter);
router.put('/producter/:id', authenticate, authorize('staff', 'superstaff'), producterController.updateProducter);
router.delete('/producter/:id', authenticate, authorize('staff', 'superstaff'), producterController.deleteProducter);

module.exports = router;