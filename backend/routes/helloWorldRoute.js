

const express = require('express');
const helloWorldController = require('../controllers/helloWorldController');

const router = express.Router();

router.get('/hello-world', helloWorldController);

module.exports = router;