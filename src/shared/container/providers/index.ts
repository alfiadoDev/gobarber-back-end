import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DisckStorageProvider from './storageProvider/implementations/DisckStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DisckStorageProvider,
);
