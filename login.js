const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ordner für User-Dateien
const USERS_DIR = path.join(__dirname, 'Users');

// POST /login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.send('ERROR: Missing fields');

    const userFile = path.join(USERS_DIR, username + '.txt');

    if (!fs.existsSync(userFile)) return res.send('ERROR: User does not exist');

    const storedPassword = fs.readFileSync(userFile, 'utf8');

    if (storedPassword === password) {
        res.send('SUCCESS');
    } else {
        res.send('ERROR: Wrong password');
    }
});

module.exports = router;
