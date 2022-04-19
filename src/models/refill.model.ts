/* eslint-disable prettier/prettier */
import { IRefill } from './../interfaces/refill';
import { model, Schema, Document } from 'mongoose';

const refillSchema: Schema = new Schema({
    customerId:  {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    frequencyInterval: {
    type: String,
    required: true,
  },
  prescriptionImage: {
    type: Array,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  nextRefillDate: {
    type: Date,
    required: true,
  },
  otherInformation: {
    type: String,
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Order'
  },

},
{
  timestamps: true,
});

const RefillModel = model<IRefill & Document>('Refill', refillSchema);

export default RefillModel;
