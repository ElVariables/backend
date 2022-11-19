const express = require('express');

const handleLogin = require('./handleLogin.js');
const note = require('./note.js');

const router = express.Router();

router.use('/login', handleLogin);
router.use('/note', note);

module.exports = router;
