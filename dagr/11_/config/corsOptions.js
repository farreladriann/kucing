const allowedOrigins = require('./allowedOrigins');

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

module.exports = corsOptions;