import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { DirectoriesService } from './directories.service';
import { CreateDirectoryDto, UpdateDirectoryDto } from './dto';
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

  @Patch('id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ) {
    return this.directoriesService.update(id, updateDirectoryDto);
  }

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