import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = []

    async save(user: User): Promise<User> {
      const userIndex = this.users.findIndex((item) => item.id === user.id);

      this.users[userIndex] = user;
      return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
      const user = this.users.find((item) => item.email === email);
      return user;
    }

    async findById(id: string): Promise<User | undefined> {
      const user = this.users.find((item) => item.id === id);
      return user;
    }

    async create(data: ICreateUsersDTO):Promise<User> {
      const user = new User();

      Object.assign(user, { id: uuid() }, data);

      this.users.push(user);

      return user;
    }
}
