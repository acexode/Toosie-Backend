/* eslint-disable prettier/prettier */
export interface IOrder {
  customerId: string;
  paymentId: string;
  paymentStatus: string;
  deliveryStatus: string;
  totalCost: number;
  products: string;
  shipping: object;
}
