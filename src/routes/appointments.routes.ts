import {
  Router,
} from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment{
    id: string
    provider: string
    data: Date
}

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

  const appointment = {
    id: uuid(),
    provider,
    data: parseDate,
  };

  appointments.push(appointment);

  return response.status(201).json({
    message: 'Cadastrado com sucesso',
  });
});

appointmentsRouter.get('/', (request, response) => response.json(appointments));

export default appointmentsRouter;
