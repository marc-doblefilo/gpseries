import { Module } from '@nestjs/common';

import { mongoConnectionProvider } from './database.provider';

@Module({
  providers: [mongoConnectionProvider],
  exports: [mongoConnectionProvider],
})
export class DatabaseModule {}