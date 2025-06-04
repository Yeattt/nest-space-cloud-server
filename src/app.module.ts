import { Module } from '@nestjs/common';

import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [FilesModule, AuthModule],
})
export class AppModule {}
