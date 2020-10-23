import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

import IMailerProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailerProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
