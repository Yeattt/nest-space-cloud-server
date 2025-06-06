import { Module } from '@nestjs/common';

import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [FilesModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
