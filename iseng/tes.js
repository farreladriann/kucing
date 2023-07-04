const bcrypt = require('bcrypt');

bcrypt.hash("babi", 10, (error, hashing) => {
    console.log(hashing);
});

bcrypt.compare("babi", "$2b$10$qGhecCG0i2K/vrc4uBD0Behys1mmy5syBkNCpZ/nZC6OU14Nyp6S", (error, isEqual) => {
    console.log(isEqual);
});
