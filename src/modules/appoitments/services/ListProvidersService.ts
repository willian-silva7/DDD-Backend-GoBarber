import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersSevice {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `provider-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(
        `provider-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListProvidersSevice;
