import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
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

