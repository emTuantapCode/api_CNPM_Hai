const { default: mongoose } = require('mongoose')
mongoose.set('strictQuery', false);

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cartoon')
        console.log('DB connected successfully!');
    } catch (error) {
        console.log('DB connection failed!')
        throw new Error(error)
    }
}

module.exports = dbConnect