const jwt = require("jsonwebtoken")
const customError = require("../Utils/customError")

const verifyToken = async (req, res, next) => {
    try {
        const userToken = req.headers.authorization
        if(!userToken || !userToken.startsWith("Bearer")){
            throw new customError("Access Denied", 401)
        }
        const token = userToken.split(" ")[1]
        const decoded = jwt.verify(token, process.env.jwt_secret)
        if(!decoded){
            throw new customError("Access Denied", 401)
        }
        req.user = decoded
        console.log(decoded)
        next()
    } catch (error) {
        // if statement is to re-write the error message for better user readability
        if(error.message === "jwt expired"){
            res.status(401).json({succes : false, msg : "Your Token has Expired, LogIn Back to gain access"})
        }
        // this line re-writes the status code to 403 instead of 500 (due to the errorHandler middleware)
        if(error.message === "invalid token"){
            res.status(401).json({success : false, msg : "invalid token"})
        }
        // this line re-writes the status code to 403 instead of 500 (due to the errorHandler middleware)
        if(error.message === "jwt must be provided"){
            res.status(401).json({success : false, msg : "Please provide a valid token"})
        }
        next(error)
    }
}

module.exports = verifyToken