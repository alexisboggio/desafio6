const errorMiddleware = (req, res, next) => {
    res.status(500).json({
        success: "False",
        error: err.message
    })
}

module.exports = errorMiddleware