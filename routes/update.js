const express = require('express');
const router = express.Router();
const update = require('../controllers/updateController');

router.post('/preferences',update.preferences);
router.post('/info',update.userInfo);

module.exports = router;