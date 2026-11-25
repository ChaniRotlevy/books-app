const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "נתיב לא נמצא", type: "not found" });
};

const errorHandler = (err, req, res, next) => {
    const isBadRequest = err.name === 'CastError' || err.name === 'ValidationError' || err.name === 'MulterError';
    const statusCode = err.status || (isBadRequest ? 400 : 500);

    let message = err.message || "שגיאת שרת כללית";
    if (err.code === 'LIMIT_FILE_SIZE') message = 'הקובץ גדול מדי, המקסימום הוא 1MB';

    res.status(statusCode).json({
        error: message,
        details: err.details, // מערך השגיאות מ-Joi (לא יופיע אם אין)
        type: "server error"
    });
};

module.exports = { notFoundHandler, errorHandler };