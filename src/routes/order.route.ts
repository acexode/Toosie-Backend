/* eslint-disable prettier/prettier */
import { Router } from 'express';
import OrderController from '@controllers/order.controller';
import { CreateOrderDTO } from '@dtos/order.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import NotificationController from '@/controllers/notification.controller';

class OrderRoute implements Routes {
  public path = '/order';
  public notifyPath = '/notify';
  public router = Router();
  public OrderController = new OrderController();
  public NotificationController = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.OrderController.getOrders);
    this.router.get(`${this.path}/:id`, this.OrderController.getOrderById);
    this.router.post(`${this.path}`, validationMiddleware(CreateOrderDTO, 'body'), this.OrderController.createOrder);
    this.router.post(`${this.notifyPath}`, this.NotificationController.createNotification);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateOrderDTO, 'body', true), this.OrderController.updateOrder);
    this.router.delete(`${this.path}/:id`, this.OrderController.deleteOrder);
  }
}

export default OrderRoute;
