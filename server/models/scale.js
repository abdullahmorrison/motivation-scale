const mongoose = require('mongoose');

const scaleSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    title: String,
    sliderValue: {
        type: Number,
        default: 50
    },
    avoidingFailureDescription: String,
    chasingSuccessDescription: String,
    order: Number
}, 
{
    timestamps: true,
})

const scale = mongoose.model('scale', scaleSchema);
module.exports = scale;