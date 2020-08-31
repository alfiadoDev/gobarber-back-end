import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import LisProvidertDayAvailabilityService from './ListProviderDayAvailabilityService';

let lisProvidertDayAvailabilityService: LisProvidertDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    lisProvidertDayAvailabilityService = new LisProvidertDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const listAvailability = await lisProvidertDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(listAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});