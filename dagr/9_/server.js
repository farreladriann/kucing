const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware untuk handle urlencoded data
// dengan kata lain, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public'))); // '/' by default

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
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
