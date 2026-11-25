const validate = (schema, property = 'body') => (req, res, next) => {
    // abortEarly: false = אל תעצור בשגיאה הראשונה, אסוף את כולן
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
        const err = new Error('שגיאות בבדיקת תקינות הנתונים');
        err.status = 400;
        err.details = error.details.map((d) => d.message); // מערך עם כל השגיאות
        return next(err); // זורקים למידלוור השגיאות
    }
    next();
};

module.exports = validate;