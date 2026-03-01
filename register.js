const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ordner für User-Dateien
const USERS_DIR = path.join(__dirname, 'Users');
if (!fs.existsSync(USERS_DIR)) {
    fs.mkdirSync(USERS_DIR);
}

// POST /register
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Einfache Validierung
    if (!username || !password) return res.send('ERROR: Missing fields');
    if (username.length < 4) return res.send('ERROR: Name too short');
    if (username.length > 15) return res.send('ERROR: Name too long');
    if (!/^[a-zA-Z0-9._]+$/.test(username)) return res.send('ERROR: Invalid characters');
    if (password.length < 5) return res.send('ERROR: Password too short');
    if (password.length > 30) return res.send('ERROR: Password too long');

    const userFile = path.join(USERS_DIR, username + '.txt');

    if (fs.existsSync(userFile)) {
        return res.send('ERROR: User already exists');
    }

    // Passwort in Datei speichern
    fs.writeFile(userFile, password, (err) => {
        if (err) {
            console.error(err);
            return res.send('ERROR: Could not save user');
        }
        res.send('SUCCESS');
    });
});

module.exports = router;
