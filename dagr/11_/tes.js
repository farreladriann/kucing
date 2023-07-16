// const express = require('express');
// const app = express();
// console.log(app);

//==========
// const coba = {
//     nama: "babi",
//     hidung: "besar"
// }
// const makanan = "nabati"

// console.log({...coba, makanan});

// o
// { nama: 'babi', hidung: 'besar', makanan: 'nabati' }

//=============
// const nasi = [
//     {
//         nama: "babi",
//         hidung: "besar"
//     },
//     {
//         NAMA: "koecing",
//         cakar: "kencang"
//     }
// ]

// const baru = {
//     bisu: "sadas",
//     ken: "sadhajj"
// }

// console.log([...nasi, baru]);

// o
// [
//   { nama: 'babi', hidung: 'besar' },
//   { NAMA: 'koecing', cakar: 'kencang' },
//   { bisu: 'sadas', ken: 'sadhajj' }
// ]

//==========
// require('dotenv').config();
// console.log(require('dotenv'));
// console.log(process.env);

// ==========
// const jwt = require('jsonwebtoken');
// console.log(jwt);
// o
// {
//     decode: [Function (anonymous)],
//     verify: [Function (anonymous)],
//     sign: [Function (anonymous)],
//     JsonWebTokenError: [Function: JsonWebTokenError],
//     NotBeforeError: [Function: NotBeforeError],
//     TokenExpiredError: [Function: TokenExpiredError]
// }

// const nasi = [
//     {
//         nama: "babi",
//         hidung: "besar"
//     },
//     {
//         NAMA: "koecing",
//         cakar: "kencang"
//     }
// ]

// const baru = {
//     bisu: "sadas",
//     ken: "sadhajj"
// }

// console.log(baru['bisu']);

// require('dotenv').config();

// console.log(process.env.REFRESH_TOKEN_SECRET);

//============

// var express = require("express");

// var app = express();

// app.get("/", function (req, res) {
//     res.cookie('jwt', 'kucing', { httpOnly: true, maxAge: 60 * 1000 });
//     res.send('cookies disimpen di localhost:3000');
// });

// app.listen(3000);

//============

var express = require("express");
var cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());

app.get("/", function (req, res) {
    console.log(req.cookies);
    res.send("Check the console for cookies!");
});

app.listen(3000);
// =============
