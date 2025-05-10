const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();
router.use(authenticate, authorize('superstaff'));

router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;