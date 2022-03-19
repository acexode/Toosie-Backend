/* eslint-disable prettier/prettier */
import { IOrder } from './../interfaces/order.interface';
import { model, Schema, Document } from 'mongoose';

const orderSchema: Schema = new Schema({ 
	customerId:  {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
	paymentId:  {
    type: String,
    required: true,
  },
  paymentStatus:  {
    type: String,
    enum: ["pending", "paid"],
    required: true,
  },
  paymentMethod:  {
    type: String,
    enum: ["pod", "card"],
    required: true,
  },
  deliveryStatus:  {
    type: String,
    enum: ["pending", "delivered"],
    required: true,
  },
	totalCost:  {
    type: Number,
    required: true,
  },
	products: [ 
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
    ],
	shipping:  {
      address: String,
      city: String,
      state: String,
      postalCode: String
    }
} );

const OrderModel = model<IOrder & Document>('Order', orderSchema);

export default OrderModel;
