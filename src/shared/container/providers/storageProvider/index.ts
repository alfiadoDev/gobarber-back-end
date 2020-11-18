import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DisckStorageProvider from './implementations/DisckStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disck: DisckStorageProvider,
  s3: S3StorageProvider,
};

if (uploadConfig.driver === 'disck') {
  container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers.disck,
  );
} else if (uploadConfig.driver === 's3') {
  container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    providers.s3,
  );
}
