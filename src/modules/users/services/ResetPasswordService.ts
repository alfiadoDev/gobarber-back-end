import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
  token: string;

  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) throw new AppError('User token not exists');

    const user = await this.userRepository.findById(userToken.id);

    if (!user) throw new AppError('User does not exists');

    user.password = password;

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
