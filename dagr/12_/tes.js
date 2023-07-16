// const foundUser = {
//     "username": "Farrel",
//     "roles": {
//         "User": 2001,
//         "Editor": 1984,
//         "Admin": 5150
//     },
//     "password": "$2b$10$kuYMt/FR93iXsRrON0Dbg.fC4akM/hZ9W.CXRIUfBhSC3/B3al5zC"
// }

// const roles = Object.values(foundUser.roles);
// console.log(roles);

// o 
// [ 2001, 1984, 5150 ]

// =======
// const foundUser = {
//     "username": "Farrel",
//     "roles": {
//         "User": 2001,
//         "Editor": 1984,
//         "Admin": 5150
//     },
//     "password": "$2b$10$kuYMt/FR93iXsRrON0Dbg.fC4akM/hZ9W.CXRIUfBhSC3/B3al5zC"
// }

// const roles = Object.values(foundUser.roles);

// console.log(roles);

// const bb = { 
//     "UserInfo": {
//         "username": foundUser.username,
//         "roles": roles
//     }
// }

// console.log(bb);
//=======
// const roles = ['admin', 'user', 'guest'];
// const verifyRoles = (...roles) => {
//     console.log(roles);
// };
// verifyRoles(roles);
// o
// [ [ 'admin', 'user', 'guest' ] ]

//=======
// const verifyRoles = (...roles) => {
//     console.log(roles);
// };
// verifyRoles('nasi', 22, ['kucing', 99], { 'key1': 'berani', 'key2': { 'key3': 'kaga breani' }});
// verifyRoles(roles);

//o
// [
//     'nasi',
//     22,
//     [ 'kucing', 99 ],
//     { key1: 'berani', key2: { key3: 'kaga breani' } }
// ]

// ========
// const obj1 = { a: 1, b: 2 };
// const obj2 = [1, 2, 3];
// const obj3 = { ...obj1, ...obj2 };

//obj3
//{ a: 1, b: 2, '0': 1, '1': 2, '2': 3 }
