import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepoitory: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepoitory = new FakeUserRepository();
    listProvidersService = new ListProvidersService(fakeUserRepoitory);
  });

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUserRepoitory.create({
      name: 'olaaaa',
      email: 'e@e.com',
      password: '123456',
    });
    const user1 = await fakeUserRepoitory.create({
      name: 'olaaaa2',
      email: 'e2@e.com',
      password: '123456',
    });
    const user2 = await fakeUserRepoitory.create({
      name: 'olaaaa3',
      email: 'e3@e.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
