/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: false,
  },
  avater: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: null,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  address: {
    state: String,
    localGov: String,
    address: String,
  }
},
{
  timestamps: true,
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
