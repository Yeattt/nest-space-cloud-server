import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [DirectoriesController],
  providers: [DirectoriesService, PrismaService],
  exports: [DirectoriesService],
})
export class DirectoriesModule { }