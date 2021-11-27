exports.authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if (permissions.includes(userRole)) {
            next();
        } else {
            res.status(401).json("Désolé, vous n'êtes pas autorisés à accèder à cette page !");
        }
    };
}