import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointementsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
