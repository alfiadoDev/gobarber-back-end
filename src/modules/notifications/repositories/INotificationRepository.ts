import INotificationRepositoryDTO from '../dtos/ICreateNotificationRepositoryDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationRepository {
  create(data: INotificationRepositoryDTO): Promise<Notification>;
}
