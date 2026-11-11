const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: [String], default: [] },
    author: {
        name: { type: String },
        phone: { type: String },
        email: { type: String }
    }
});

module.exports = mongoose.model('Book', bookSchema);