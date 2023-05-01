/* eslint-disable prettier/prettier */
export interface IOrder {
  customerId: string;
  paymentId: string;
  paymentStatus: string;
  deliveryStatus: string;
  paymentMethod: string;
  deliveryType: string;
  priorityDelivery: boolean;
  totalCost: number;
  products: [];
  orderDetails: [];
  shipping: object;
}
