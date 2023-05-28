/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';

import NotificationService from '@/services/notification.service';
import { INotification } from '@/interfaces/notification.interface';


class NotificationController {
  public NotificationService = new NotificationService();

  public getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNotificationsData: INotification[] = await this.NotificationService.findAllNotification();

      res.status(200).json({ data: findAllNotificationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NotificationId: string = req.params.id;
      const findOneNotificationData: INotification = await this.NotificationService.findNotificationById(NotificationId);

      res.status(200).json({ data: findOneNotificationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createNotification = async (req: any, res: Response, next: NextFunction) => {
    try {
      const NotificationData: INotification = req.body;
      const createNotificationData: INotification = await this.NotificationService.createNotification(NotificationData);

      res.status(201).json({ data: createNotificationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };


}

export default NotificationController;
