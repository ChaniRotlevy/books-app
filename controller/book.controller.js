const Book = require('../models/book.model');
const User = require('../models/user.model');
const notFound = (next) => {
    const error = new Error('הספר לא נמצא');
    error.status = 404;
    return next(error);
};

const getBooks = async (req, res, next) => {
    try {
        const { category, maxPrice, page, limit } = req.query;
        const filter = {};
        if (category) filter.categories = category;
        if (maxPrice) filter.price = { $lte: Number(maxPrice) };
        let query = Book.find(filter);
        if (page && limit) {
            const p = Number(page);
            const l = Number(limit);
            query = query.skip((p - 1) * l).limit(l);
        }
        const books = await query;
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return notFound(next);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

const addBook = async (req, res, next) => {
    try {
        const { name, price, categories, author } = req.body;
        const newBook = await Book.create({ name, price, categories, author });
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!book) return notFound(next);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return notFound(next);
        res.status(200).json({ message: 'הספר נמחק בהצלחה' });
    } catch (error) {
        next(error);
    }
};

const borrowBook = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const book = await Book.findById(bookId);
        if (!book) return notFound(next);
        user.borrowedBooks.push(bookId);
        await user.save();
        res.json({ message: "Book borrowed successfully", user });
    } catch (error) {
        next(error);
    }
};

const returnBook = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.borrowedBooks = user.borrowedBooks.filter(id => id.toString() !== bookId);
        await user.save();
        res.json({ message: "Book returned successfully", user });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook
};