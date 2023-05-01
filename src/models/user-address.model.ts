/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { UserAddress } from '@interfaces/user-address.interface';

const userAddressSchema: Schema = new Schema({
  state: {
    type: String,
    required: true,
  },
  localGov: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},
{
  timestamps: true,
});

const userAddressModel = model<UserAddress & Document>('UserAddress', userAddressSchema);

export default userAddressModel;
