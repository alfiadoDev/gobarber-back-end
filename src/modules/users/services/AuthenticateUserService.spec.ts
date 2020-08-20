import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to auhtenticate user', async () => {
    const fakeUserRepoitory = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'meu nome',
      email: 'email@email.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'email@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to auhtenticate user with no exists user', async () => {
    const fakeUserRepoitory = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to auhtenticate user with wrong password', async () => {
    const fakeUserRepoitory = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'meu nome',
      email: 'email@email.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'email@email.com',
        password: '123456nbnbnb',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
