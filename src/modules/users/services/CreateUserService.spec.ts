import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

let fakeUsersRepository: any;
let bcryptHash: any;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  bcryptHash = new BCryptHashProvider();
});

describe('CreateUser', () => {
  it('should to be able create a new user', async () => {
    const createUserService = new CreateUserService(fakeUsersRepository, bcryptHash);

    const user = await createUserService.execute({
      email: 'leto@gmail.com',
      name: 'leto',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const createUserService = new CreateUserService(fakeUsersRepository, bcryptHash);

    await createUserService.execute({
      email: 'leto@gmail.com',
      name: 'leto',
      password: '123456',
    });

    expect(createUserService.execute({
      email: 'leto@gmail.com',
      name: 'leto',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
