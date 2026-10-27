const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "נתיב לא נמצא", type: "not found" });
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: err.message || "שגיאת שרת כללית",
        type: "server error"
    });
};

module.exports = { notFoundHandler, errorHandler };