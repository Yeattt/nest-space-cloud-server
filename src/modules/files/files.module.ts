import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      dest: '../../uploads',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService, PrismaService],
  exports: [FilesService],
})
export class FilesModule { }