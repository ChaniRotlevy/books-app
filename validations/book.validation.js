const Joi = require('joi');

// אובייקט המחבר - כל השדות אופציונליים, אבל אם נשלחו - הם חייבים להיות תקינים
const authorSchema = Joi.object({
    name: Joi.string().min(2).max(50),
    phone: Joi.string()
        .pattern(/^0\d{1,2}-?\d{7}$/)
        .messages({ 'string.pattern.base': 'מספר הטלפון לא תקין' }),
    email: Joi.string().email()
});

// הוספת ספר - שם ומחיר חובה
const addBookSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    price: Joi.number().positive().required(),
    categories: Joi.array().items(Joi.string().min(2)),
    author: authorSchema
});

// עדכון ספר - אותם שדות, אבל אף אחד לא חובה. צריך לפחות שדה אחד
const updateBookSchema = addBookSchema
    .fork(['name', 'price'], (field) => field.optional())
    .min(1);

// בדיקת מזהה מונגו (24 תווים הקסדצימליים) - לשימוש במחיקה
const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
});

// השאלה/החזרה של ספר
const borrowSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    bookId: Joi.string().hex().length(24).required()
});

module.exports = { addBookSchema, updateBookSchema, idParamSchema, borrowSchema };