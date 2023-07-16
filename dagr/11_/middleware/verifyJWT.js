const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    //pake kurung siku biar bisa ngakses kea req.headers['content-length']
    // console.log(authHeader);
    if (!authHeader) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];//split itu dipisahin jadi array kaloa ada spasi, contoh nasi kucing negara jadi ['nasi', 'kucing', 'negara']
    // console.log(token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {//decoded itu hasil tokennya
            if (err) return res.sendStatus(403); //invalid token forbidden
            req.user = decoded.username;
            console.log(decoded);
            console.log(decoded.username);
            next();
        }
    )
}

module.exports = verifyJWT;
