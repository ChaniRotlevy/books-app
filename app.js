const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(express.json());

const readDB = () => {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/books', (req, res) => {

    let books = readDB();
    const { category, maxPrice, page, limit } = req.query;

    if (category) {
        books = books.filter(b => b.category === category);
    }

    if (maxPrice) {
        books = books.filter(b => b.price <= Number(maxPrice));
    }

    if (page && limit) {
        const p = Number(page);
        const l = Number(limit);
        const startIndex = (p - 1) * l;
        books = books.slice(startIndex, startIndex + l);
    }

    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const books = readDB();
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    res.status(200).json(book);
});

app.post('/books', (req, res) => {
    const books = readDB();
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        isBorrowed: false,
        borrowings: []
    };

    books.push(newBook);
    writeDB(books);

    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const books = readDB();
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    books[index] = { ...books[index], ...req.body, id: bookId };
    writeDB(books);

    res.status(200).json(books[index]);
});

app.delete('/books/:id', (req, res) => {
    const books = readDB();
    const bookId = parseInt(req.params.id);
    const filteredBooks = books.filter(b => b.id !== bookId);

    if (books.length === filteredBooks.length) {
        return res.status(404).json({ message: 'הספר לא נמצא' });
    }

    writeDB(filteredBooks);
    res.status(200).json({ message: 'הספר נמחק בהצלחה' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});