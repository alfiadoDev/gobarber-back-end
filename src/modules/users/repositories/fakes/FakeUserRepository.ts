import { uuid } from 'uuidv4';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../../dtos/IFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let usersAll = this.users;

    if (except_user_id)
      usersAll = usersAll.filter(user => user.id !== except_user_id);

    return usersAll;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
