import {
  Router,
} from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// SoC: Separation of Concerns (Separacao de preocupacao)
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email, name, password,
  });

  return response.status(201).json(user);
});

export default usersRouter;
