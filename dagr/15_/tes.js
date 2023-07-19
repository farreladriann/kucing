// const User = require('./model/User');

// const tes = () => {
//     User.find({});
//     console.log(has);
// }

// tes();
//======
// const _b = "kucing";
// console.log(_b);
//=======
// const mongoose = require("mongoose");

// // ...
// const req = {
//     body: {
//         id: "nasikuycing"
//     }
// }

// if (
//     !req.body ||
//     !req.body.id ||
//     !mongoose.Types.ObjectId.isValid(req.body.id)
// ) {
//     console.log(' message: "Invalid ID provided" ');
// }

//========
const jwt = require('jsonwebtoken');
require('dotenv').config();

jwt.verify (
    'sajdklajflnajkfnckjncvl',
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        console.log(decoded);
    }
)
