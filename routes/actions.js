const express = require('express');
const router = express.Router();

const actionController = require('../src/controllers/actionController');

router.post('/', actionController.listen);

module.exports = router;
