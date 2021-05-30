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
    avoidingFailureDescription: String, //Describing (D) what would be avoiding failure (AF)?
    chasingSuccessDescription: String // Describing (D) what would be chasing success (CS)?
}, 
{
    timestamps: true,
})

const scale = mongoose.model('scale', scaleSchema);
module.exports = scale;