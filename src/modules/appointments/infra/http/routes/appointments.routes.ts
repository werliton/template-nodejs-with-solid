/* eslint-disable camelcase */
import {
  Router,
} from 'express';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
// SoC: Separation of Concerns (Separacao de preocupacao)
appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.findAll();
  return response.json(appointments);
});

export default appointmentsRouter;
