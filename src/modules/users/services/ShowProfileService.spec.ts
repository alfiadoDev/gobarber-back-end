import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepoitory: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepoitory = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepoitory);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.name).toBe('olaaaa');
    expect(profile.email).toBe('e@e.com');
  });

  it('should not be able to show user profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'fake id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
