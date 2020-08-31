import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request{
    email:string
    password: string
}

export default class AuthenticationUserService {
  async execute({ email, password }: Request): Promise<{user: User}> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    return {
      user,
    };
  }
}
