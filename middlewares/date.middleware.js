const addCurrentDate = (req, res, next) => {
    req.currentDate = new Date().toISOString();
    next();
};

module.exports = addCurrentDate;