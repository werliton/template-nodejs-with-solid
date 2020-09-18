import AppError from '@shared/errors/AppError';
import User from '@modules/users//infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request{
    name: string
    email: string
    password: string
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private ihashProvider: IHashProvider,
  ) {}

  async execute({ email, name, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already User', 401);
    }

    const hashedPassword = await this.ihashProvider.generateHash(password);

    const user = await this.usersRepository.create(
      {
        email,
        name,
        password: hashedPassword,
      },
    );

    // delete user.password;

    return user;
  }
}
