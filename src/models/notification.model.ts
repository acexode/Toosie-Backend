/* eslint-disable prettier/prettier */

import { INotification } from '@/interfaces/notification.interface';
import { model, Schema, Document } from 'mongoose';

const notificationSchema: Schema = new Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    expirationTime: {
      type: String,
    },

    keys: {
      p256dh: String,
      auth: String,
    },
  },
  {
    timestamps: true,
  },
);

const notificationModel = model<INotification & Document>('Notification', notificationSchema);

export default notificationModel;
