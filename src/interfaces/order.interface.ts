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
  orderDetails: orderDetails[];
  shipping:  IShipping ;
}

interface orderDetails {
  product: string;
  quantity: number;
}

interface IShipping {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  addressDeliveryCost: number;
}
