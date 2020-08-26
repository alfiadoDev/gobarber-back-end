import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepoitory: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepoitory = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepoitory,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const appointment = await createUserService.execute({
      name: 'meu nome',
      email: 'email@email.com',
      password: '123456',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUserService.execute({
      name: 'meu nome',
      email: 'email@email.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'meu nome',
        email: 'email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
