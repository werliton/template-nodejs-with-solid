import {
  Router,
} from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

interface Appointment{
    id: string
    provider: string
    data: string
}

type Appointments = Array<Appointment>

const appointments: Appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, data } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    data,
  };

  appointments.push(appointment);

  return response.status(201).json({
    message: 'Cadastrado com sucesso',
  });
});

appointmentsRouter.get('/', (request, response) => response.json(appointments));

export default appointmentsRouter;
