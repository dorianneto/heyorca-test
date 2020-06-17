const express = require('express');
const router = express.Router();

const commandController = require('../src/controllers/commandController');

router.post('/', commandController.index);

module.exports = router;
