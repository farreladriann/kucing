// const User = require('./model/User');

// const tes = () => {
//     User.find({});
//     console.log(has);
// }

// tes();
//======
// const _b = "kucing";
// console.log(_b);
// //=======
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

const express = require('express')
const app = express()

const hasil = app.get('/', (req, res) => {
    console.log('mnatap');
    res.json({ 'message': 'sada' });
});

console.log(hasil);

app.listen(3000, () => console.log('terhubung'));