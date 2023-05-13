/* eslint-disable prettier/prettier */
import { IReferral } from '@/interfaces/referral.interface';
import { model, Schema, Document } from 'mongoose';

const refererSchema: Schema = new Schema(
  {
    referrer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    referee: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    referrerToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ReferralModel = model<IReferral & Document>('Referral', refererSchema);

export default ReferralModel;
