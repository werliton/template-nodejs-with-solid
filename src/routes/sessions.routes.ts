import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationUser = new AuthenticationUserService();

  const { user, token } = await authenticationUser.execute({
    email, password,
  });

  delete user.password;

  return response.status(201).json({ user, token });
});

export default sessionsRouter;
