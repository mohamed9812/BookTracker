const express = require("express");
const router = express.Router();
const auth = require('../Controllers/auth.controller');


router.post('/register', auth.register);
router.get('/verify-email/:token', auth.verifyEmail);
router.post('/login', auth.login);
// router.post('/logout', auth.logout);

module.exports = router;