const customError = require("../Utils/customError")


const authorizeUser = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new customError("Access Denied, Unauthorized Request", 403)
        }
        next()
    }
}

module.exports = authorizeUser