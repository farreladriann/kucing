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
const mongoose = require("mongoose");

// ...
const req = {
    body: {
        id: "nasikuycing"
    }
}

if (
    !req.body ||
    !req.body.id ||
    !mongoose.Types.ObjectId.isValid(req.body.id)
) {
    console.log(' message: "Invalid ID provided" ');
}
