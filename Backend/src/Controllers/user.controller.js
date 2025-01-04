const mongoose = require('mongoose');
const File = require('../Models/File');


exports.uploadBook = async (req, res) => {

    const userId = req.params.userId;

  try {
    if (!req.file) {
      return res.status(400).send({ message: "Kein Datei hochgeladen" });
    }

    const { originalname, buffer, mimetype } = req.file;

    const newFile = new File({
      userId: userId,
      name: originalname,
      data: buffer,
      contentType: mimetype,
    });

    await newFile.save();


    res.status(200).send({ message: "Datei erfolgreich hochgeladen"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Fehler beim Hochladen der Datei" });
  }
};

exports.getBook = async (req, res) => {
  const { userId } = req.params;

  console.log("Hier");

  try {
    // Datei aus der Datenbank abrufen
    const file = await File.findOne({ userId: userId });

    if (!file) {
      return res.status(404).send({ message: "Datei nicht gefunden" });
    }

    // Datei zurücksenden (inline)
    res.set({
      'Content-Type': file.contentType, // Der MIME-Typ der Datei (z.B. 'application/pdf')
      'Content-Disposition': `inline; filename="${file.name}"`, // Stelle sicher, dass 'inline' hier gesetzt ist
    });

    res.send(file.data); // Datei im Body zurücksenden
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Fehler beim Abrufen der Datei" });
  }
};

