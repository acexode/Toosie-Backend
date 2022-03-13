/* eslint-disable prettier/prettier */
import { IPrescription } from './../interfaces/prescription.interface';
import { model, Schema, Document } from 'mongoose';

const prescriptionSchema: Schema = new Schema({
    description: {
    type: String,
    required: true,
  },
  prescriptionImage: {
    type: String,
    required: true,
  },
});

const PrescriptionModel = model<IPrescription & Document>('Prescription', prescriptionSchema);

export default PrescriptionModel;
