/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request{
    provider_id: string
    date: Date
}
/**
 * O service nunca tem acesso as requisicoes
 */

// Dependece Inversion
// DRY (Don't Repeat Yourself)
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository:IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 401);
    }

    const appointment = await this.appointmentsRepository
      .create({ provider_id, date: appointmentDate });

    return appointment;
  }
}

export default CreateAppointmentService;
