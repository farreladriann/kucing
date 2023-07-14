const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    console.log('^/$|/index(.html)?');
    console.log(req.headers.origin);
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));//200
});

router.get('/new-page(.html)?', (req, res) => {
    console.log('/new-page(.html)?');
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));//200
});

router.get('/old-page(.html)?', (req, res) => {
    console.log('/old-page(.html)?');
    res.redirect(301, '/new-page.html'); //302 by deault
});

module.exports = router;