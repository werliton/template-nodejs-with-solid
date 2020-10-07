import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request{
    email: string
}

@injectable()
export default class SendForgotPasswordEmailService {
    private readonly bodyMessage = 'Pedido de recuperacao de senha recebido.'

    constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
    ) {}

    async execute({ email }: Request): Promise<void> {
      const checkUserExists = await this.usersRepository.findByEmail(email);

      if (checkUserExists === undefined) {
        throw new AppError('Invalid email');
      }

      this.mailProvider.sendMail(email, this.bodyMessage);
    }
}
