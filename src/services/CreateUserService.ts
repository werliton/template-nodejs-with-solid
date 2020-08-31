import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
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

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create(
      {
        email,
        name,
        password: hashedPassword,
      },
    );

    delete user.password;

    await usersRepository.save(user);

    return user;
  }
}
