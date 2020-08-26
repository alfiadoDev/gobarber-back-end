import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepoitory: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepoitory = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepoitory,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'oi',
      email: 'profile@pro.com',
    });

    expect(updatedUser.name).toBe('oi');
    expect(updatedUser.email).toBe('profile@pro.com');
  });
  it('should not be able to change the email to another user email ', async () => {
    const user = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });

    const user2 = await fakeUserRepoitory.create({
      name: 'user2',
      email: 'user@user.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'oi',
        email: user2.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'oi',
      email: 'profile@pro.com',
      password: '12345678',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('12345678');
  });

  it('should not be able to update password without old_password', async () => {
    const user = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'oi',
        email: 'profile@pro.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old_password', async () => {
    const user = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'oi',
        email: 'profile@pro.com',
        password: '12345678',
        old_password: 'aiiii',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
