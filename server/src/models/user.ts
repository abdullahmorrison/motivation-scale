import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: type: String,
  token: String
}, {
  timestamps: true,
});

export const UserModel = model('User', userSchema);

