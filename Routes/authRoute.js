const express = require("express")
const router = express.Router()
const {register, login, deleteUser, allUsers} = require("../Controllers/authController")
const verifyToken = require("../Middleware/tokenAuth")
const authorizedUsers = require("../Middleware/authorizeRole")


router.post('/register', register)
router.post('/login', login)
router.get("/all", verifyToken, authorizedUsers("admin"), allUsers)
router.delete("/delete/:userId", verifyToken, authorizedUsers("admin"), deleteUser)



module.exports = router