const express = require('express');
const router = express.Router();
const { getBooks, borrowBook, returnBook } = require('../controllers/book.controller');

router.get('/', getBooks);
router.post('/borrow', borrowBook);
router.post('/return', returnBook);

module.exports = router;