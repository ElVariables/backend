const express = require('express');

const handleLogin = require('./handleLogin');

const router = express.Router();

router.use('/login', handleLogin);

module.exports = router;
