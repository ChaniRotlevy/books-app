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

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/borrow', borrowBook);
router.post('/return', returnBook);

module.exports = router;