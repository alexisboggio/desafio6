const middlewareError = (error, _req, res, next) => {
    res.status(500).json({
        succes: 'false',
        error: error.message
    })
}

module.exports = middlewareError