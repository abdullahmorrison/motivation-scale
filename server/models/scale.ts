import { Schema, model } from "mongoose";

const scaleSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    goal: {
        type: String,
        required: true,
        trim: true
    },
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

export const ScaleModel = model('scale', scaleSchema);