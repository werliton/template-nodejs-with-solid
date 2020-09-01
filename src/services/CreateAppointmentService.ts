/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request{
    provider_id: string
    date: Date
}
/**
 * O service nunca tem acesso as requisicoes
 */

// Dependece Inversion
// DRY (Don't Repeat Yourself)

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 401);
    }

    const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
