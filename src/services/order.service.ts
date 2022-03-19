/* eslint-disable prettier/prettier */
import { CreateOrderDTO } from '@dtos/order.dto';
import { HttpException } from '@exceptions/HttpException';
import { IOrder } from '@interfaces/order.interface';

import { isEmpty, uuidv4 } from '@utils/util';
import OrderModel from '@/models/order.model';

class OrderService {
  public Orders = OrderModel;

  public async findAllOrder(query): Promise<IOrder[]> {
    const Orders: IOrder[] = await this.Orders.find(query);
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
      paymentId: uuidv4()
    }
    const createOrderData: IOrder = await this.Orders.create(newOrder);

    return createOrderData;
  }

  public async updateOrder(OrderId: string, OrderData: CreateOrderDTO): Promise<IOrder> {
    if (isEmpty(OrderData)) throw new HttpException(400, "You're not OrderData");

    if (OrderId) {
      const findOrder: IOrder = await this.Orders.findOne({ _id: OrderId });
      if (!findOrder) throw new HttpException(409, `Order does not  exists`);
    }

    const updateOrderById: IOrder = await this.Orders.findByIdAndUpdate(OrderId, { OrderData });
    if (!updateOrderById) throw new HttpException(409, 'Failed to update Order');

    return updateOrderById;
  }

  public async deleteOrder(OrderId: string): Promise<IOrder> {
    const deleteOrderById: IOrder = await this.Orders.findByIdAndDelete(OrderId);
    if (!deleteOrderById) throw new HttpException(409, 'Failed to delete Order');

    return deleteOrderById;
  }
}

export default OrderService;
