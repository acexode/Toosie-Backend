/* eslint-disable prettier/prettier */
import { CreateOrderDTO } from '@dtos/order.dto';
import { HttpException } from '@exceptions/HttpException';
import { IOrder } from '@interfaces/order.interface';

import { isEmpty, uuidv4 } from '@utils/util';
import OrderModel from '@/models/order.model';
import userModel from '@/models/users.model';
import ProductModel from '@/models/products.model';

class OrderService {
  public Orders = OrderModel;
  public UserM = userModel;
  public ProductM = ProductModel;

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
      deliveryStatus: 'pending',
    };
    const createOrderData: IOrder = await this.Orders.create(newOrder);
    if (OrderData.paymentStatus === 'paid') {
      const amount = 0.05 * (OrderData.totalCost - OrderData.shipping?.addressDeliveryCost);
      if(OrderData.loyaltyPoint){
        userModel.findByIdAndUpdate(OrderData.customerId, { $set: { loyaltyPoint: amount } });
      }else{

        userModel.findByIdAndUpdate(OrderData.customerId, { $inc: { loyaltyPoint: amount } });
      }
    }

    return createOrderData;
  }

  public async updateOrder(OrderId: string, OrderData): Promise<IOrder> {
    if (isEmpty(OrderData)) throw new HttpException(400, "You're not OrderData");

    const findOrder: IOrder = await this.Orders.findOne({ _id: OrderId });
    console.log(findOrder);
    if (!findOrder) throw new HttpException(409, `Order does not  exists`);

    // if (OrderData.paymentStatus === 'paid') {
    //   const amount = 0.05 * (findOrder.totalCost - findOrder.shipping?.addressDeliveryCost);
    //   console.log(findOrder.totalCost, findOrder.shipping?.addressDeliveryCost, amount);
    //   const user = await userModel.findByIdAndUpdate(findOrder.customerId, { $inc: { loyaltyPoint: amount } });
    //   console.log(user);
    // }
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
