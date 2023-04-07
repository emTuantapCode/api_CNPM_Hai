const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var cartoonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    rate: {
        type: String,
        required: true,
    }
});

//Export the model
module.exports = mongoose.model('Cartoon', cartoonSchema);