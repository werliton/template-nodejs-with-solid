import {
  Router,
} from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// SoC: Separation of Concerns (Separacao de preocupacao)
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = createUser.execute({
      email, name, password,
    });

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;
