import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';

import { FilesService } from './files.service';
import { UploadFileDto } from './dto';
import { PaginationDto } from '../../common';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  create(
    @Body() uploadFileDto: UploadFileDto,
  ) {
    return this.filesService.upload(uploadFileDto);
  };

  @Get()
  findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.filesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.filesService.findOne(id);
  };

  @Delete(':id')
  delete(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.filesService.delete(id);
  };
}