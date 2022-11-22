const express = require('express');

const Auth = require('./Auth.js');
const Note = require('./Note.js');

const router = express.Router();

router.use('/auth', Auth);
router.use('/note', Note);

module.exports = router;
