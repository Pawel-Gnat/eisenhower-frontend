import { LocalStorageStrategy } from './local-storage-strategy';
import { ApiStorageStrategy } from './api-storage-strategy';

import { StorageStrategy } from '@/types';

export class StorageFactory {
  static createApiStrategy(): StorageStrategy {
    return new ApiStorageStrategy();
  }

  static createLocalStrategy(): StorageStrategy {
    return new LocalStorageStrategy();
  }
}
