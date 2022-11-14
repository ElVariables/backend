const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [
   {
        id: '1',
        username: 'admin',
        password: 'admin',
    },
];

router.get('/', (req, res) => {
    res.json(users);
});
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(401).send({
            msg: 'Missing Fields',
        });
    }

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send({
            msg: 'User not available',
        });
    }

    const key = process.env.SECRET_KEY;
    const token = jwt.sign(
        {
            username: user.username,
        },
        key,
        { expiresIn: 600 },
    );

    return res.json({
        msg: 'Auth',
        username: user.username,
        accessToken: token,
    });
});
router.put('/', (req, res) => {
    res.send('login');
});
router.delete('/', (req, res) => {
    res.send('login');
});

module.exports = router;
