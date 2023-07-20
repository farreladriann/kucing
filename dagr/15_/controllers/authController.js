const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser)
        return res.status(401).json({ 'message': 'There is no username' });
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
        // Saving refreshToken with current user
        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } 
        );
        
        const newRefreshTokenArray =
            !cookies?.jwt ?// kalo gada jwt
                foundUser.refreshToken // pake yang lama
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt)
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);
        // res.cookie('jwt', ref reshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 60 * 60 * 1000 });
        res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.status(401).json({ 'message': 'password doesn\'t match with username' });;
    }
}

module.exports = { handleLogin };
