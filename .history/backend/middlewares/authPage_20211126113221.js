import xContentTypeOptions from "helmet/dist/middlewares/x-content-type-options";

const authPage = (permissions) => {
    return (req, res, next) {
        const userRole = req.body.role;
        if (permissions.includes(userRole)) {
            next();
        } else {
            res.status(401).json("Vous n'^etes pas autorisés à accèder à cette page")
        })
}
}