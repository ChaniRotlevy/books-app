const express = require('express');
const connectDB = require('./config/db');
const addCurrentDate = require('./middlewares/date.middleware');
const checkGetMethod = require('./middlewares/checkGet.middleware');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(addCurrentDate);
app.use(checkGetMethod);

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();