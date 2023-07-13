const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = ['https://your-site.com', 'http://127.0.0.1:5500', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin_, callback) => {
        if (whitelist.indexOf(origin_) !== -1 || !origin_) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// built-in middleware untuk handle urlencoded data
// dengan kata lain, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('^/$|/index(.html)?', (req, res) => {
    console.log('^/$|/index(.html)?');
    console.log(req.headers.origin);
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

app.all('*', (req, res) => {
    console.log(req.accepts());
    console.log('*');
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        //coba
        //curl -H "Accept: application/json" http://localhost:3000/sadas
        res.json({ error: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

//custom middleware error handler
app.use(errorHandler);

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
