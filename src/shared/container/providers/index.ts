import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DisckStorageProvider from './storageProvider/implementations/DisckStorageProvider';

import IMailerProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DisckStorageProvider,
);
container.registerInstance<IMailerProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
