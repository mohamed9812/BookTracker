# README

## Projektbeschreibung

Dieses Projekt besteht aus:

1. Einem **Backend**, erstellt mit **Node.js** und **MongoDB**.
2. Einer **mobilen App**, entwickelt mit **React Native und Expo**.

Die Anleitung führt Sie durch die Installation und das Ausführen der beiden Komponenten.

---

## Voraussetzungen

### Installierte Software

- **Node.js** (Version 20 oder höher)
- **MongoDB** (lokal oder in der Cloud, z. B. MongoDB Atlas)
- **npm** (wird mit Node.js geliefert)

### Systemanforderungen

- Ein Computer mit einem modernen Betriebssystem (Windows, macOS, Linux)
- Optional: Ein Smartphone oder Emulator für die APP

---

## Installation

### 1. Node.js Backend

1. **Repository klonen**:

   ```bash
   git clone https://github.com/Inthense/BookTracker.git
   cd Backend
   ```

2. **Abhängigkeiten installieren**:

   ```bash
   npm install
   ```

3. **Server starten**:

   ```bash
   npm run start
   ```

   Der Server wird auf `http://localhost:4000` ausgeführt (sofern nicht anders konfiguriert).

### 2. MongoDB

1. **MongoDB installieren oder konfigurieren**:

   - Lokal: Installieren Sie MongoDB entsprechend der [offiziellen Anleitung](https://www.mongodb.com/docs/manual/installation/).
   - Cloud: Erstellen Sie eine Datenbank in MongoDB Atlas und kopieren Sie die Verbindungs-URL in der .env.

2. **Verbindung testen**: Stellen Sie sicher, dass Ihr Node.js-Backend erfolgreich eine Verbindung zur Datenbank herstellt.

### 3. Frontend

1. **Repository klonen**:

   ```bash
   cd ..
   git clone https://github.com/Inthense/BookTracker.git
   cd Frontend
   ```

2. **Abhängigkeiten installieren**:

   ```bash
   npm install
   ```

3. **App starten**:

   ```bash
   npm start


4. **App instalieren**:
   ```bash
   https://expo.dev/accounts/booktracker/projects/booktracker/builds/77b2488f-a5ed-4ae2-863c-e456ffda6bfb
   ```
5. **App einrichten**
   
   App starten und Link in der Konsole einfügen. Im Frontend localhost durch die private IP-Adresse (192....) ersetzen.
   Das Gerät muss im selben Netzwerk sein.

---

## Tests

### Backend testen

- Nutzen Sie Tools wie **Postman** oder **curl**, um die API-Endpunkte zu testen.
- Beispiel:
  ```bash
  curl http://localhost:5000/api/auth/login
  ```

### App testen

- Starten Sie die App und prüfen Sie die Kommunikation mit dem Backend indem Sie sich versuchen einzuloggen.

---


