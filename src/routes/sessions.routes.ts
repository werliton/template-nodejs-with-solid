import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticationUser = new AuthenticationUserService();

    const { user, token } = await authenticationUser.execute({
      email, password,
    });

    delete user.password;

    return response.status(201).json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({
      error: err.message,
    });
  }
});

export default sessionsRouter;
