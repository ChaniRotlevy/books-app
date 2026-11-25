const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(uploadDir, { recursive: true }); // יוצר את התיקייה אם אינה קיימת

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    // שם הקובץ: מזהה הספר + חותמת זמן + הסיומת המקורית
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${req.params.id}-${Date.now()}${ext}`);
    }
});

// מקבל רק קבצי תמונה
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        const err = new Error('מותר להעלות קבצי תמונה בלבד');
        err.status = 400;
        return cb(err);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 } // 1MB
});

module.exports = upload;