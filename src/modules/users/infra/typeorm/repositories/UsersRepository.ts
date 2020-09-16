import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
    private ormUserRepository: Repository<User>

    constructor() {
      this.ormUserRepository = getRepository(User);
    }

    async save(user: User): Promise<User> {
      const userSaved = await this.ormUserRepository.save(user);
      return userSaved;
    }

    async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.ormUserRepository.findOne({
        where: {
          email,
        },
      });
      return user;
    }

    async findById(id: string): Promise<User | undefined> {
      const user = await this.ormUserRepository.findOne(id);
      return user;
    }

    async create(data: ICreateUsersDTO):Promise<User> {
      const user = this.ormUserRepository.create(data);
      await this.ormUserRepository.save(user);
      return user;
    }
}
