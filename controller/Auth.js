const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userType = require('../Schema/userType');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const id = req.id;
    try {
        const user = await userType.findById(id).select('-password');
        if (!user) {
            return res.status(401).json({
                msg: '!authorization',
            });
        }
        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Bad Request',
        });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            msg: 'Missing Fields',
        });
    }

    try {
        let user = await userType.findOne({ username });
        if (!user) {
            return res.status(400).json({
                msg: 'User not available',
            });
        }
        const authorization = await bcrypt.compare(password, user.password);
        if (!authorization) {
            return res.status(400).json({
                msg: 'User not available',
            });
        }
        const key = process.env.SECRET_KEY;
        const token = jwt.sign(
            {
                id: user.id,
            },
            key,
            { expiresIn: 600 },
        );

        res.status(201).json({
            msg: 'Auth',
            username: user.username,
            accessToken: token,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Bad Request",
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.json({
                msg: 'Cant be empty',
            });
        }
        let user = await userType.findOne({ username });
        if (user) {
            return res.json({
                msg: 'User available',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new userType({
            username,
            password: hashPassword,
        });

        await user.save()
        res.status(200).json({
            msg: 'Register Successfully',
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
});

module.exports = router;
