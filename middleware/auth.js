const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('hva-token');

    if (!token) {
        return res.status(401).json({
            msg: 'You must login first',
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                msg: 'Invalid Token',
            });
        }
        req.id = decode.id;
        next();
    });
};

module.exports = auth;
