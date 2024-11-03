const express = require('express');

const router= express.Router();

const {message} = require('../Controller/messageController');

router.post("/message", message)

module.exports = router;

