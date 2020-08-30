/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Response{
    provider: string
    date: Date
}
/**
 * O service nunca tem acesso as requisicoes
 */

// Dependece Inversion
// DRY (Don't Repeat Yourself)

class CreateAppointmentService {
  public async execute({ date, provider }: Response): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({ provider, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
