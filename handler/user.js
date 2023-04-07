const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    try {
        const { account, password, name } = req.body
        if (!account || !password || !name) {
            return res.status(400).json({
                success: false,
                mes: 'missing input'
            })
        }
        const response = await User.findOne({ account })
        if (response) {
            return res.status(400).json({
                success: false,
                mes: 'account already existed'
            })
        }
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register done! Please go login' : 'Something went wrong'
        })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { account, password } = req.body
        if (!account || !password) {
            return res.status(400).json({
                success: false,
                mes: 'missing input'
            })
        }
        const response = await User.findOne({ account })
        if (!response) {
            return res.status(400).json({
                success: false,
                mes: 'can not find user'
            })
        }
        const correctPassword = bcrypt.compareSync(password, response.password)
        if (!correctPassword) {
            return res.status(400).json({
                success: false,
                mes: 'password is wrong'
            })
        }
        const accessToken = jwt.sign({ _id: response._id, role: response.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).json({
            success: accessToken ? true : false,
            accessToken: accessToken ? 'Bearer ' + accessToken : null
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login
}