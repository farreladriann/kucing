const verifyRoles = (...allowredRoles) => { // rest parameter, dapat menerima sebanyak apapun argumen dan nanti parameter2 tsb dijadikan array
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowredRoles];
        console.log(rolesArray);
        console.log(req.roles);
        const result = req.roles.map(role => rolesArray.includes(roles)).find(val => val === true);
    }
}