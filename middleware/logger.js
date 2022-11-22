const logger = (req, res, next) => {
    const now = new Date();
    console.log('Request at: ', now);
    next();
};

module.exports = logger;
