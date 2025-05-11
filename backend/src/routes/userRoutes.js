const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/users', authorize('staff', 'superstaff'), userController.getUsers);
router.get('/user/:id', authorize('staff', 'superstaff'), userController.getUser);
router.put('/user/:id', authorize('staff', 'superstaff'), userController.updateUser);
router.delete('/user/:id', authorize('staff', 'superstaff'), userController.deleteUser);

module.exports = router;