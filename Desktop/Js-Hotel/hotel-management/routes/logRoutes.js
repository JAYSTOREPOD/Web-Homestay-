const express = require('express');
const { getLogs } = require('../controllers/logController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', getLogs);

module.exports = router;
