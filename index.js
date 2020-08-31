const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Connected!', date: new Date() });
})

app.get('*', (req, res) => {
    res.redirect('/');
})

app.listen(port);