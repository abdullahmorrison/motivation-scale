import { Schema, model } from "mongoose";

const scaleOrderSchema = new Schema({
  userId: String,
  scaleOrder: [String]
}, 
{
  timestamps: true,
})

export const ScaleOrderModel = model('scaleOrder', scaleOrderSchema);
