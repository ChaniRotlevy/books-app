const express = require('express');
const router = express.Router();
const { getAllUsers, signUp, signIn, updateUser } = require('../controllers/user.controller');
const { checkAuth, checkAdmin, checkSameUser } = require('../middlewares/auth.middleware');

router.get('/', checkAuth, checkAdmin, getAllUsers);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.put('/:id', checkAuth, checkSameUser, updateUser);

module.exports = router;