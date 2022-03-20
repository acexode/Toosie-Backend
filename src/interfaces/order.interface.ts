/* eslint-disable prettier/prettier */
export interface IOrder {
  customerId: string;
  paymentId: string;
  paymentStatus: string;
  deliveryStatus: string;
  paymentMethod: string;
  totalCost: number;
  products: [];
  orderDetails: [];
  shipping: object;
}
