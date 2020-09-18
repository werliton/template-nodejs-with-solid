import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticationUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

describe('AuthenticationUser', () => {
  it('should not be able authenticate the user with invalid email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const bcryptHash = new BCryptHashProvider();
    const authUserService = new AuthenticationUserService(fakeUsersRepository, bcryptHash);

    expect(authUserService.execute({
      email: 'jopao@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate the user with invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const bcryptHash = new BCryptHashProvider();
    const authUserService = new AuthenticationUserService(fakeUsersRepository, bcryptHash);
    const createUserService = new CreateUserService(fakeUsersRepository, bcryptHash);

    // Criar objeto
    await createUserService.execute({
      email: 'jao@gmail.com',
      name: 'joao',
      password: '123456',
    });
    // Verificar se a senha bate

    expect(authUserService.execute({
      email: 'jopao@gmail.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const bcryptHash = new BCryptHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, bcryptHash);
    const authUserService = new AuthenticationUserService(fakeUsersRepository, bcryptHash);

    // Criar objeto
    const user = await createUserService.execute({
      email: 'jao@gmail.com',
      name: 'joao',
      password: '123456',
    });
    // Verificar se a senha bate

    const response = await authUserService.execute(
      {
        email: 'jao@gmail.com',
        password: '123456',
      },
    );

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const bcryptHash = new BCryptHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, bcryptHash);
    const authUserService = new AuthenticationUserService(fakeUsersRepository, bcryptHash);

    // Criar objeto
    await createUserService.execute({
      email: 'jao@gmail.com',
      name: 'joao',
      password: '12345',
    });
    // Verificar se a senha bate

    expect(authUserService.execute(
      {
        email: 'jao@gmail.com',
        password: '123456',
      },
    )).rejects.toBeInstanceOf(AppError);
  });
});
