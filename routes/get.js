const express = require('express');
const router = express.Router();
const get = require('../controllers/getController');

router.post('/preferences',get.preferences);
router.post('/info',get.userInfo);

module.exports = router;