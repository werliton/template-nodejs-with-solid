import { Router } from 'express';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();
const usersRepository = new UsersRepository();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationUser = new AuthenticationUserService(usersRepository);

  const { user, token } = await authenticationUser.execute({
    email, password,
  });

  delete user.password;

  return response.status(201).json({ user, token });
});

export default sessionsRouter;
