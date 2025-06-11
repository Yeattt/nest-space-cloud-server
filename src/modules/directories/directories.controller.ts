import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto } from './dto';
import { PaginationDto } from '../../common';

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
  public findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.directoriesService.findAll(paginationDto);
  };

  @Get(':id')
  public findOne(id: string) {
    return this.directoriesService.findOne(id);
  };
}