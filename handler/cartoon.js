const Cartoon = require('../models/cartoon')

const read = async (req, res) => {
    try {
        const cartoons = await Cartoon.find()
        return res.status(200).json({
            success: cartoons ? true : false,
            data: cartoons
        })
    } catch (error) {
        console.log(error)
    }
}

const add = async (req, res) => {
    try {
        const { name } = req.body
        const cartoon = await Cartoon.findOne({ name })
        if (cartoon) {
            return res.status(400).json({
                success: false,
                mess: 'this name already existed'
            })
        }
        const newCartoon = await Cartoon.create(req.body)
        return res.status(200).json({
            success: newCartoon ? true : false,
            mes: newCartoon ? 'Created a new record' : 'Something went wrong'
        })
    } catch (error) {
        console.log(error)
    }
}

const edit = async (req, res) => {
    try {
        const { _id, name, rate } = req.body
        const cartoon = await Cartoon.findOne({ _id })
        if (!cartoon) {
            return res.status(400).json({
                success: false,
                mes: 'can not find record'
            })
        }
        cartoon.name = name
        cartoon.rate = rate
        await cartoon.save()
        return res.status(400).json({
            success: true,
            mes: 'updated a record'
        })
    } catch (error) {
        console.log(error)
    }
}

const destroy = async (req, res) => {
    try {
        const response = await Cartoon.deleteOne({ _id: req.query._id })
        return res.status(200).json({
            success: response ? true : false,
            mess: 'destroyed a record'
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    read,
    add,
    edit,
    destroy
}