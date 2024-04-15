import { Schema, model } from "mongoose";

const scaleSchema = new Schema({
    userId:{
      type: String,
      required: true
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
