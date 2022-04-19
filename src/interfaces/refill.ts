/* eslint-disable prettier/prettier */
export interface IRefill {
  customerId: string;
  frequencyInterval: string;
  prescriptionImage: [];
  frequency: string;
  startDate: Date;
  nextRefillDate: Date;
  otherInformation: string;
  orderId: string;
}
