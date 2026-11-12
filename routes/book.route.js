const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
} = require('../controllers/book.controller');
const { checkAuth, checkSameUserOrAdmin } = require('../middlewares/auth.middleware');

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/borrow', checkAuth, checkSameUserOrAdmin, borrowBook);
router.post('/return', checkAuth, checkSameUserOrAdmin, returnBook);

module.exports = router;