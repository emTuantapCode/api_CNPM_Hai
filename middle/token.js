const jsonwebtoken = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization?.split(' ')[1]
        jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    mes: err.message
                })
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication!'
        })
    }
}

const isAdmin = (req, res, next) => {
    const { role } = req.user
    if (+role !== 1) {
        return res.status(401).json({
            success: false,
            mes: 'Require admin role!'
        })
    }
    next()
}

module.exports = {
    verifyToken,
    isAdmin
}