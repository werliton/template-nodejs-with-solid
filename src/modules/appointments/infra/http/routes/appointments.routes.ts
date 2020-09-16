/* eslint-disable camelcase */
import {
  Router,
} from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);
// SoC: Separation of Concerns (Separacao de preocupacao)
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return response.status(201).json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.findAll();
  return response.json(appointments);
});

export default appointmentsRouter;
