import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticationUser = container.resolve(AuthenticationUserService);

    const { user, token } = await authenticationUser.execute({
      email, password,
    });

    delete user.password;

    return response.status(201).json({ user, token });
  }
}
