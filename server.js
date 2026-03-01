const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./register');
const loginRoute = require('./login');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
