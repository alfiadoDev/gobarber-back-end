// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepoitory = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepoitory,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepoitory.create({
      name: 'email',
      email: 'email@email.com',
      password: '123456',
    });

    sendForgotPasswordEmailService.execute({
      email: 'email@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
