const User = require("../Models/userModel")
const handleErrors = require("../Utils/handleError")
const customError = require("../Utils/customError")

const register = async (req, res, next) => {
    try {
        const {userName, email, password, role} = req.body
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            throw new customError("Account already exist", 400)
        }
        if(!userName || ! email || !password){
            throw new customError("Please provide the necessary details", 400)
        }
        const user = await User.create(req.body)
        res.status(201).json({success : true, msg : "User Created", user})
    } catch (error) {
        next(error)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            throw Error("Account not found")
        }
        const isCorrect = await user.comparePassword(password)
        if(!isCorrect){
            throw Error("Invalid Credentials")
        }
        const token = user.generateToken()
        res.status(200).json({
            successs : true,
            userId : user._id,
            userName : user.userName,
            email : user.email,
            role : user.role,
            token
        })
    } catch (error) {
        const errors = handleErrors(error) 
        if(Object.keys(errors).length === 0){
            return res.status(500).json({success : false, msg : "Server error"})
        }
        if(!errors.password){
            res.status(404).json({success : false, msg : error.message, errors})
        }
        res.status(400).json({success : false, msg : error.message, errors})
    }
} 

const deleteUser = async (req, res, next) => {
    try {
        const {userId} = req.params
        const user = await User.findById({_id : userId})
        if(!user){
            throw new customError("User not Found", 404)
        }
        if(user.role === "admin"){
            throw new customError("Unauthorized Action, You cannot delete a fellow admin", 403)
        }
        await User.findByIdAndDelete(userId)
        res.status(200).json({sucess : true, msg : "User deleted successfully"})
    } catch (error) {
        next(error)
    }
}

const allUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({createdAt : -1})
        res.status(200).json({success : true, users})
    } catch (error) {
        next(error)
    }
}

module.exports = {register, login, deleteUser, allUsers}