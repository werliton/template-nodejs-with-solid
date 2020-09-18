import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UploadUserAvatarService';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

describe('UploadUserAvatarService', () => {
  it('should be able to update user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const bcryptHash = new BCryptHashProvider();
    const userCreated = new CreateUserService(fakeUsersRepository, bcryptHash);
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository);

    await userCreated.execute({
      email: 'email@email',
      name: 'ramon',
      password: '123456',
    });

    expect(updateUserAvatarService.execute({
      user_id: '121212',
      avatarFilename: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Invalid User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository);

    expect(updateUserAvatarService.execute({
      user_id: '121212',
      avatarFilename: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
