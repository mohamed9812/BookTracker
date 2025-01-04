const express = require("express");
const router = express.Router();
const multer = require("multer");
const user = require("../Controllers/user.controller");

// Multer-Konfiguration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route zum Hochladen des Buches
router.post('/upload-book/:userId', upload.single('file'), user.uploadBook);
router.get('/get-book/:userId', user.getBook);


module.exports = router;