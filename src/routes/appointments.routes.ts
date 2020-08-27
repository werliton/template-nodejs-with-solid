import {
  Router,
} from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

// SoC: Separation of Concerns (Separacao de preocupacao)
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, data } = request.body;

    const parseDate = parseISO(data);

    const createAppointment = new CreateAppointmentService(appointmentRepository);

    const appointment = createAppointment.execute({
      date: parseDate,
      provider,
    });

    return response.status(201).json(appointment);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

appointmentsRouter.get('/', (request, response) => response.json(appointmentRepository.all()));

export default appointmentsRouter;
