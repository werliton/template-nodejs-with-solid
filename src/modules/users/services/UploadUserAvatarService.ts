import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    // eslint-disable-next-line camelcase
    user_id: string
    avatarFilename: string
}
class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  // eslint-disable-next-line camelcase
  async execute({ user_id, avatarFilename }: Request): Promise<User> {
    // Verificar se o id do usuário eh um id valido
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Invalid User');
    }
    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
