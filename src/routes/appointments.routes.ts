import {
  Router,
} from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

// SoC: Separation of Concerns (Separacao de preocupacao)
appointmentsRouter.post('/', (request, response) => {
  const { provider, data } = request.body;

  const parseDate = startOfHour(parseISO(data));

  const findAppointmentInSameDate = appointmentRepository.findByDate(parseDate);

  if (findAppointmentInSameDate) {
    return response.status(400).json({
      message: 'This appointment is already booked',
    });
  }

  const appointment = appointmentRepository.create({ provider, date: parseDate });

  return response.status(201).json(appointment);
});

appointmentsRouter.get('/', (request, response) => response.json(appointmentRepository.all()));

export default appointmentsRouter;
