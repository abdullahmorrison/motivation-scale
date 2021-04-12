const mongoose = require('mongoose');

const scaleSchema = mongoose.Schema({
    title: String,
    sliderValue: {
        type: Number,
        default: 50
    },
    explanation: String,
    futurePlan: String
})

const scale = mongoose.model('scale', scaleSchema);
module.exports = scale;