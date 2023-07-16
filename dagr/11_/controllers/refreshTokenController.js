const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

// ini buat ngerefresh accessToken
// refresh token, token yang digunakan untuk merefresh accessToken
const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); // optional chaining
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    // jika tidak ada jwt dalam cookies atau jika cookies sendiri tidak ada
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden
    // evaluate jwt
    jwt.verify (
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            res.json({ accessToken });
        }
    )
}

module.exports = { handleRefreshToken };
