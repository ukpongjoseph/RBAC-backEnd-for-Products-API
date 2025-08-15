const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const schemaConstructor = mongoose.Schema
const userSchema = new schemaConstructor({
    userName : {
        type: String,
        required: [true, "please provide your username"]
    },
    email : {
        type: String,
        required: [true, "please provide your email address"],
        unique : true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required : [true, "please provide your password"],
        minLenght: [6, "minimum password length is 6"]
    },
    role : {
        type: String,
        required: [true, "choose a role"],
        enum : ["admin", "user"],
        default : "user"
    }

}, {timestamps: true}
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.methods.comparePassword = async function (password){
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}
userSchema.methods.generateToken = function(){
    return(
        jwt.sign(
        {userId : this._id, role : this.role},
        process.env.jwt_secret,
        {expiresIn : "1h"}
        )
    )
}

module.exports = mongoose.model("user", userSchema)