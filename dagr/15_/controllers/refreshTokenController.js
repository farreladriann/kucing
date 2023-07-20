const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });

    // Operasi ini akan mencari user yang memiliki 'refreshToken' sebagai salah satu refreshTokennya. Perhatikan bahwa ini bukan pencarian eksklusif, artinya pengguna mungkin juga memiliki user lain.
    const foundUser = await User.findOne({ refreshToken }).exec();

    // kasus kalo refresh tokennya dipake ulang
    // karena nanti dikasih token banyak, dan tiap tokennya cuma bisa dipake sekali
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) res.sendStatus(403); //kalo misal tokennya invalid, nanti if (err) nya true
                //token invalid itu yg bukan token jwt
                console.log('attempted refresh token');
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                if (hackedUser) {
                    hackedUser.refreshToken = [];
                    const result = await hackedUser.save();
                    console.log(result);
                }
            }
        );
        return res.sendStatus(403); // Forbidden
    }

    // refresh token dipake, sehingga yg udah dipake dihapus
    // yang belom dipake masih ada
    const newRefreshTokenArray = foundUser.refreshToken.filter(RT => RT !== refreshToken);
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) { //kalo misal refreshTokennya expired
                console.log('expired refresh token');
                foundUser.refreshToken = [...newRefreshToken];
                const result = await foundUser.save();
                console.log(result);
            }
            if (err || foundUser.username !== decoded.username)
                return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10s" }
            );

            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            // sekarang jadinya satu akun bisa banyak devices
            res.cookie('jwt', newRefreshToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            res.json({ roles, accessToken });
        }
    );
};

module.exports = { handleRefreshToken };
