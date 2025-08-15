const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    let errMsg = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success : false,
        msg : errMsg
    })
}

module.exports = errorHandler