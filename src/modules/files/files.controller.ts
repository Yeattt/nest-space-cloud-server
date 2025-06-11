import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { UploadFilesDto } from './dto';
import { PaginationDto } from '../../common';
import { fileNamer } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: '../../uploads',
      filename: fileNamer,
    })
  }))
  public upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadFilesDto: UploadFilesDto,
  ) {
    return this.filesService.upload(files, uploadFilesDto);
  };

  @Get()
  public findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.filesService.findAll(paginationDto);
  };

  @Get(':id')
  public findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.filesService.findOne(id);
  };

  @Delete(':id')
  public delete(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.filesService.delete(id);
  };
}