/* eslint-disable prettier/prettier */
import { IPrescription } from './../interfaces/prescription.interface';
import { model, Schema, Document } from 'mongoose';

const prescriptionSchema: Schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    prescriptionImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PrescriptionModel = model<IPrescription & Document>('Prescription', prescriptionSchema);

export default PrescriptionModel;
