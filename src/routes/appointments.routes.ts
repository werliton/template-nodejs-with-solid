import {
  Router, Request, Response,
} from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request: Request, response: Response) => response.json({
  message: 'Ola mundo',
}));

appointmentsRouter.get('/', (request, response) => response.json({ message: 'oi' }));

export default appointmentsRouter;
