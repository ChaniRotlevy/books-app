const express = require('express');
const router = express.Router();
const { getAllUsers, signUp, signIn, updateUser } = require('../controllers/user.controller');
const { checkAuth, checkAdmin, checkSameUser } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { signUpSchema, signInSchema, updateUserSchema } = require('../validations/user.validation');

router.get('/', checkAuth, checkAdmin, getAllUsers);
router.post('/signup', validate(signUpSchema), signUp);
router.post('/signin', validate(signInSchema), signIn);
router.put('/:id', checkAuth, checkSameUser, validate(updateUserSchema), updateUser);

module.exports = router;