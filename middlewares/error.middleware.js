const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "נתיב לא נמצא", type: "not found" });
};

const errorHandler = (err, req, res, next) => {
    const isBadRequest = err.name === 'CastError' || err.name === 'ValidationError';
    const statusCode = err.status || (isBadRequest ? 400 : 500);
    res.status(statusCode).json({
        error: err.message || "שגיאת שרת כללית",
        type: "server error"
    });
};

module.exports = { notFoundHandler, errorHandler };