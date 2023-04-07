const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcryptjs')

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10))
})

//Export the model
module.exports = mongoose.model('User', userSchema);