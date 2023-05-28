/* eslint-disable prettier/prettier */
import { CreateOrderDTO } from '@dtos/order.dto';
import { HttpException } from '@exceptions/HttpException';
import { IOrder } from '@interfaces/order.interface';

import { isEmpty, uuidv4 } from '@utils/util';
import OrderModel from '@/models/order.model';
import userModel from '@/models/users.model';
import ProductModel from '@/models/products.model';
import notificationModel from '@/models/notification.model';
import { INotification } from '@/interfaces/notification.interface';
const webpush = require('web-push');
const vapidKeys = {
  publicKey: 'BEvFjH8RiqlzCGg3KQOv-xxktBqiiVHPCMMlDxRTTrhgA1nRPvV7yBQ79Aa8bT6ZeYT6b06ViQ2sp2AoOSJ0R_8',
  privateKey: '5GOFvtncEpg8fuE7EZaFZDzt7zIA8usxToqwyikmtCk'
}
const options = {
  vapidDetails: {
      subject: 'mailto:toosiePharmacy.com',
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey,
  },
  TTL: 60,
};


const payload = {
  notification: {
      title: 'Title',
      body: 'A new order has been submitted',
      icon: 'assets/icons/icon-384x384.png',
      actions: [
          { action: 'bar', title: 'View Order' },
          // { action: 'baz', title: 'Navigate last' },
      ],
      data: {
          onActionClick: {
              default: { operation: 'openWindow' },
              bar: {
                  operation: 'focusLastFocusedOrOpen',
                  url: '/dashboard/main/sales/orders',
              },
              // baz: {
              //     operation: 'navigateLastFocusedOrOpen',
              //     url: '/signin',
              // },
          },
      },
  },
};
class OrderService {
  public Orders = OrderModel;
  public UserM = userModel;
  public ProductM = ProductModel;
  public notfify = notificationModel;

  public async findAllOrder(query): Promise<IOrder[]> {
    const Orders: IOrder[] = await this.Orders.find(query).populate('products').populate('customerId');
    return Orders;
  }

  public async findOrderById(OrderId: string): Promise<IOrder> {
    if (isEmpty(OrderId)) throw new HttpException(400, "You're not OrderId");

    const findOrder: IOrder = await this.Orders.findOne({ _id: OrderId });
    if (!findOrder) throw new HttpException(409, "You're not Order");

    return findOrder;
  }

  public async createOrder(OrderData: CreateOrderDTO): Promise<IOrder> {
    if (isEmpty(OrderData)) throw new HttpException(400, "You're not OrderData");
    const newOrder = {
      ...OrderData,
      paymentStatus: OrderData.paymentMethod === 'pod' ? 'pending' : 'paid',
      paymentId: OrderData.paymentMethod === 'pod' ? 'POD-' + uuidv4() : OrderData.paymentId,
      deliveryStatus: 'pending',
    };
    const createOrderData: IOrder = await this.Orders.create(newOrder);
    if (OrderData.paymentStatus === 'paid') {
      const amount = Math.ceil(0.05 * (OrderData.totalCost - OrderData.shipping?.addressDeliveryCost));
      if(OrderData.loyaltyPoint){
        userModel.findByIdAndUpdate(OrderData.customerId, { $set: { loyaltyPoint: amount } });
      }else{

        userModel.findByIdAndUpdate(OrderData.customerId, { $inc: { loyaltyPoint: amount } });
      }
    }

    const notifications: INotification[] = await notificationModel.find()
    if(notifications.length > 0){
      notifications.forEach(n => {
        const subscription = {
          endpoint: n.endpoint,
          expirationTime: null,
          keys: {
              auth: n.keys.auth,
              p256dh: n.keys.p256dh,
          },
        };
        webpush.sendNotification(subscription, JSON.stringify(payload), options)
        .then((_) => {
            console.log('SENT!!!');
            console.log(_);
        })
        .catch((_) => {
            console.log(_);
        });

      })
    }


    return createOrderData;
  }

  public async updateOrder(OrderId: string, OrderData): Promise<IOrder> {
    if (isEmpty(OrderData)) throw new HttpException(400, "You're not OrderData");

    const findOrder: IOrder = await this.Orders.findOne({ _id: OrderId });
    console.log(findOrder, OrderData);
    if (!findOrder) throw new HttpException(409, `Order does not  exists`);

    if (OrderData.paymentStatus === 'paid') {
      const amount = Math.ceil(0.05 * (findOrder.totalCost - findOrder.shipping?.addressDeliveryCost));
      console.log(findOrder.totalCost, findOrder.shipping?.addressDeliveryCost, amount);
      const user = await userModel.findByIdAndUpdate(findOrder.customerId, { $inc: { loyaltyPoint: amount } });
      console.log(user);
    }
    if (OrderData.deliveryStatus === 'delivered') {
      findOrder.orderDetails.forEach(async item => {
        await ProductModel.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      });
    }
    console.log(OrderData);

    const updateOrderById = await this.Orders.findByIdAndUpdate(OrderId, OrderData);
    if (!updateOrderById) throw new HttpException(409, 'Failed to update Order');

    return findOrder;
  }

  public async deleteOrder(OrderId: string): Promise<IOrder> {
    const deleteOrderById: IOrder = await this.Orders.findByIdAndDelete(OrderId);
    if (!deleteOrderById) throw new HttpException(409, 'Failed to delete Order');

    return deleteOrderById;
  }
}

export default OrderService;
