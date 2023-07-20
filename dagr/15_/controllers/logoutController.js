const User = require('../model/User');

const handeLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204);
    }

    // Delete refresh token in the database
    foundUser.refreshToken = foundUser.refreshToken.filter(RT => RT !== refreshToken);
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
}

module.exports = { handeLogout };
