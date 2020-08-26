import AppError from '@shared/errors/AppError';
import FakeAppointmentRepoitory from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepoitory: FakeAppointmentRepoitory;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepoitory = new FakeAppointmentRepoitory();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepoitory,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1234556474',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234556474');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '1234556474',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '1234556474',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
