import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import FakeAppointmentsReposipory from '@modules/appoitments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsReposipory;
let listProviderAppointment: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsReposipory();
    listProviderAppointment = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments of specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 21, 9, 0, 0),
    });

    const availability = await listProviderAppointment.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 21,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
