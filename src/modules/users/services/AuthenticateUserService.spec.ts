import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepoitory: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepoitory = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );
  });

  it('should be able to auhtenticate user', async () => {
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
    await expect(
      authenticateUserService.execute({
        email: 'email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to auhtenticate user with wrong password', async () => {
    await createUserService.execute({
      name: 'meu nome',
      email: 'email@email.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'email@email.com',
        password: '123456nbnbnb',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
