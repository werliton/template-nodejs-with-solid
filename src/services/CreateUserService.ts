import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request{
    name: string
    email: string
    password: string
}

export default class CreateUserService {
  async execute({ email, name, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = usersRepository.findOne({
      where: {
        email,
      },
    });

    if (checkUserExists) {
      throw new Error('Email address already User');
    }

    const user = usersRepository.create(
      {
        email,
        name,
        password,
      },
    );

    await usersRepository.save(user);

    return user;
  }
}
