const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    uploadBookImage
} = require('../controllers/book.controller');
const { checkAuth, checkSameUserOrAdmin } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const upload = require('../middlewares/upload.middleware');
const {
    addBookSchema,
    updateBookSchema,
    idParamSchema,
    borrowSchema
} = require('../validations/book.validation');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validate(addBookSchema), addBook);
router.put('/:id', validate(updateBookSchema), updateBook);
router.delete('/:id', validate(idParamSchema, 'params'), deleteBook);
router.post('/borrow', checkAuth, validate(borrowSchema), checkSameUserOrAdmin, borrowBook);
router.post('/return', checkAuth, validate(borrowSchema), checkSameUserOrAdmin, returnBook);

// סעיף 18 - העלאת תמונה. 'image' = שם השדה שישלחו מהלקוח
router.post('/:id/image', upload.single('image'), uploadBookImage);

module.exports = router;