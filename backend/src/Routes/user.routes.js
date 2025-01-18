const express = require("express");
const router = express.Router();
const user = require("../Controllers/user.controller");


router.get("/:id", user.getUserInformation);
router.get("/get-user-genres/:id", user.getUserGenres);
router.post("/add-genre/:id", user.addGenre);

module.exports = router;