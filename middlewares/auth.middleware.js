const jwt = require('jsonwebtoken');

const createError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

// האם יש טוקן והוא בתוקף
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createError('לא נשלח טוקן', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return next(createError('הטוקן לא תקין או שפג תוקפו', 401));
    }
};

// האם המשתמש מנהל
const checkAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(createError('אין הרשאת מנהל', 403));
    }
    next();
};

// האם המשתמש הוא בעל המזהה המבוקש (מהנתיב או מגוף הבקשה)
const getRequestedId = (req) => req.params.id || req.body.userId;

const checkSameUser = (req, res, next) => {
    if (!req.user || req.user.id !== String(getRequestedId(req))) {
        return next(createError('אין הרשאה לבצע פעולה עבור משתמש אחר', 403));
    }
    next();
};

// מנהל, או משתמש בעל המזהה המבוקש
const checkSameUserOrAdmin = (req, res, next) => {
    if (!req.user) return next(createError('אין הרשאה', 403));
    const isAdmin = req.user.role === 'admin';
    const isSame = req.user.id === String(getRequestedId(req));
    if (!isAdmin && !isSame) {
        return next(createError('אין הרשאה', 403));
    }
    next();
};

module.exports = { checkAuth, checkAdmin, checkSameUser, checkSameUserOrAdmin };