import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users//infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    name: string
    email: string
    password: string
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already User', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create(
      {
        email,
        name,
        password: hashedPassword,
      },
    );

    delete user.password;

    return user;
  }
}
