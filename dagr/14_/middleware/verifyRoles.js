const verifyRoles = (...allowredRoles) => { // rest parameter, dapat menerima sebanyak apapun argumen dan nanti parameter2 tsb dijadikan array
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowredRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;