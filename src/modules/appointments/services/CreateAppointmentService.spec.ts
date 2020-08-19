import AppError from '@shared/errors/AppError';
import FakeAppointmentRepoitory from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepoitory = new FakeAppointmentRepoitory();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepoitory,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '1234556474',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234556474');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepoitory = new FakeAppointmentRepoitory();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepoitory,
    );

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
