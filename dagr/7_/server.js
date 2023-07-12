const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.get('^/$|/index(.html)?', (req, res) => {
    console.log('^/$|/index(.html)?');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));//200
});

app.get('/new-page(.html)?', (req, res) => {
    console.log('/new-page(.html)?');
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));//200
});

//Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('mencoba load ke hello.html');
    next();
}, (req, res) => {
    res.send("Hello ngenotoot!");
});

//chaining route handlers
const satu = (req, res, next) => {
    console.log('Satu eaa');
    next()
};

const dua = (req, res, next) => {
    console.log('Dua eaa');
    next();
};

const tiga = (req, res) => {
    console.log('tiga ea');
    res.send('Finish');
};

app.get('/chain(.html)?', [satu, dua, tiga]);

app.get('/old-page(.html)?', (req, res) => {
    console.log('/old-page(.html)?');
    res.redirect(301, '/new-page.html'); //302 by deault
});

app.get('/*', (req, res) => {
    console.log('/*');
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});