import { startOfHour } from 'date-fns';
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
    private appointmentRepository: AppointmentsRepository

    constructor(appointmentRepository:AppointmentsRepository) {
      this.appointmentRepository = appointmentRepository;
    }

    public execute({ date, provider }: Response): Appointment {
      const appointmentDate = startOfHour(date);

      const findAppointmentInSameDate = this.appointmentRepository.findByDate(appointmentDate);

      if (findAppointmentInSameDate) {
        throw Error('This appointment is already booked');
      }

      const appointment = this.appointmentRepository.create({ provider, date: appointmentDate });

      return appointment;
    }
}

export default CreateAppointmentService;
