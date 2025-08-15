const errorRoute = (req, res) => {
    return res.status(404).json({success: false, message: "Route Not Found"})
}
module.exports = errorRoute