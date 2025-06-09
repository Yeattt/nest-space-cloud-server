import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { DirectoriesModule } from './modules/directories/directories.module';
import { FilesModule } from './modules/files/files.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, DirectoriesModule, FilesModule,],
  providers: [PrismaService],
})
export class AppModule {}
