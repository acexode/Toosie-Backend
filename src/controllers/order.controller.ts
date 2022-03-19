/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateOrderDTO } from '@dtos/order.dto';
import { IOrder } from '@interfaces/order.interface';
import OrderService from '@services/order.service';

class OrderController {
  public OrderService = new OrderService();

  public getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOrdersData: IOrder[] = await this.OrderService.findAllOrder(req.query);

      res.status(200).json({ data: findAllOrdersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OrderId: string = req.params.id;
      const findOneOrderData: IOrder = await this.OrderService.findOrderById(OrderId);

      res.status(200).json({ data: findOneOrderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OrderData: CreateOrderDTO = req.body;
      const createOrderData: IOrder = await this.OrderService.createOrder(OrderData);

      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OrderId: string = req.params.id;
      const OrderData: CreateOrderDTO = req.body;
      const updateOrderData: IOrder = await this.OrderService.updateOrder(OrderId, OrderData);

      res.status(200).json({ data: updateOrderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OrderId: string = req.params.id;
      const deleteOrderData: IOrder = await this.OrderService.deleteOrder(OrderId);

      res.status(200).json({ data: deleteOrderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
