const checkGetMethod = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(`GET request at: ${req.currentDate}`);
    }
    next();
};

module.exports = checkGetMethod;