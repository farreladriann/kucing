const whitelist = [
    'https://yoursite.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3000'
];

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