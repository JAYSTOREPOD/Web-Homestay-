const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', getSettings);
router.put('/:id', updateSettings);

module.exports = router;
