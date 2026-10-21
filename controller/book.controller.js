const users = require('../users');

const getBooks = (req, res) => {
  res.json([{ id: 1, title: "Book 1" }, { id: 2, title: "Book 2" }]);
};

const borrowBook = (req, res) => {
  const { userId, bookId } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.borrowedBooks.push(bookId);
  res.json({ message: "Book borrowed successfully", user });
};

const returnBook = (req, res) => {
  const { userId, bookId } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.borrowedBooks = user.borrowedBooks.filter(id => id !== bookId);
  res.json({ message: "Book returned successfully", user });
};

module.exports = { getBooks, borrowBook, returnBook };