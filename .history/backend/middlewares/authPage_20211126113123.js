import xContentTypeOptions from "helmet/dist/middlewares/x-content-type-options";

const authPage = (permissions) => {
    return (req, res, next) {
        const userRole = req.body.role;
        if (permissions.includes(userRole)) {
            next();
        })
}
}