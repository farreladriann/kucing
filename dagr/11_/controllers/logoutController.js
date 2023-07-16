const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handeLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // jika tidak ada jwt dalam cookies atau jika cookies sendiri tidak ada
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) { //kalo ga ketemu user tapi ada punya cookiesnya
        // res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        // res.clearCookie('jwt', { httpOnly: true });
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true  });

        return res.sendStatus(204);
    }

    // Delete refresh token in the database
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users, null, 4)
    );

    // res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    // res.clearCookie('jwt', { httpOnly: true });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true  });
}

module.exports = { handeLogout };
