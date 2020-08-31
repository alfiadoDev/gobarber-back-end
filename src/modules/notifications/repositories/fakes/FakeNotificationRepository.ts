import { ObjectID } from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

import ICreateNotificationRepositoryDTO from '@modules/notifications/dtos/ICreateNotificationRepositoryDTO';
import Notification from '../../infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationRepositoryDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
