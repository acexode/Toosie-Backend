/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import notificationModel from '@/models/notification.model';
import { INotification } from '@/interfaces/notification.interface';

class NotificationService {
  public notification = notificationModel;

  public async findAllNotification(): Promise<INotification[]> {
    const notifications: INotification[] = await this.notification.find();
    return notifications;
  }

  public async findNotificationById(notficationId: string): Promise<INotification> {
    if (isEmpty(notficationId)) throw new HttpException(400, "notficationId is required");

    const findNotification: INotification = await this.notification.findOne({ _id: notficationId });
    if (!findNotification) throw new HttpException(409, "Invalid Notification Id");

    return findNotification;
  }

  public async createNotification(notificationData: INotification): Promise<INotification> {
    if (isEmpty(notificationData)) throw new HttpException(400, "You're not notificationData");
    const createnotificationData: INotification = await this.notification.create(notificationData);
    console.log(createnotificationData);
    return createnotificationData;
  }
}

export default NotificationService;
