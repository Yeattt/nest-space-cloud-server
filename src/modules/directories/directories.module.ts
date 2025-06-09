import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';

@Module({
  imports: [],
  controllers: [DirectoriesController],
  providers: [DirectoriesService],
  exports: [DirectoriesService],
})
export class DirectoriesModule { }