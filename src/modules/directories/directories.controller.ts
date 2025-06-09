import { Body, Controller, Get, Post } from '@nestjs/common';

import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto';

@Controller('directories')
export class DirectoriesController {
  constructor(
    private readonly directoriesService: DirectoriesService,
  ) { }

  @Post()
  public create(
    @Body() createDirectoryDto: CreateDirectoryDto,
  ) {
    return this.directoriesService.create(createDirectoryDto);
  };

  @Get()
  public findAll() {
    return this.directoriesService.findAll();
  };

  @Get(':id')
  public findOne(id: string) {
    return this.directoriesService.findOne(id);
  };
}