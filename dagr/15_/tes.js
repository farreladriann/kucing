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
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// jwt.verify (
//     'sajdklajflnajkfnckjncvl',
//     process.env.REFRESH_TOKEN_SECRET,
//     (err, decoded) => {
//         // if (err) console.error(err);
//         console.log(decoded);
//     }
// )

//=========
// const express = require('express');
// const app = express();
// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

// app.get('/', async (req, res) => {
//     try {
//         console.log(req.cookies);
//         res.json({"kontol": "ngentot"});
//     } catch(err) {
//         console.error(err);
//     }
// });

// app.listen(3000, ()=> {
//     console.log('login to localhost:3000');
// });

// const express = require('express');
// console.log(typeof express);