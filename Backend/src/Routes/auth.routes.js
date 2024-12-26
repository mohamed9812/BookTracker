const express = require("express");
const router = express.Router();
const auth = require('../Controllers/auth.controller');


router.post('/register', auth.register);
router.post('/verify-email', auth.verifyEmail);

module.exports = router;