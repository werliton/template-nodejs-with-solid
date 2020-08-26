import {
  Router,
} from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

type Appointments = Array<Appointment>

const appointments: Appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, data } = request.body;

  const parseDate = startOfHour(parseISO(data));

  const findAppointmentInSameDate = appointments.find((item) => isEqual(parseDate, item.data));

  if (findAppointmentInSameDate) {
    return response.status(400).json({
      message: 'This appointment is already booked',
    });
  }

  const appointment = new Appointment(provider, parseDate);

  appointments.push(appointment);

  return response.status(201).json({
    message: 'Cadastrado com sucesso',
  });
});

appointmentsRouter.get('/', (request, response) => response.json(appointments));

export default appointmentsRouter;
