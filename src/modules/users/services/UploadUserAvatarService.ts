import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    // eslint-disable-next-line camelcase
    user_id: string
    avatarFilename: string
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  // eslint-disable-next-line camelcase
  async execute({ user_id, avatarFilename }: Request): Promise<User> {
    // Verificar se o id do usuário eh um id valido
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Invalid User');
    }
    if (user.avatar) {
      // Deletar avatar anterior
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
