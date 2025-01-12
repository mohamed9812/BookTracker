const express = require("express");
const router = express.Router();
const user = require("../Controllers/user.controller");


router.get("/:id", user.getUserInformation);

module.exports = router;