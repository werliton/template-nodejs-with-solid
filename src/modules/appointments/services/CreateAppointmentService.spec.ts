import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '252514',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const data = new Date();
    await createAppointment.execute({
      date: data,
      provider_id: '252514',
    });

    expect(createAppointment.execute({
      date: data,
      provider_id: '252514',
    })).rejects.toBeInstanceOf(AppError);
  });
});
