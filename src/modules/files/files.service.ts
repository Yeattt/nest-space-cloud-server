import { Injectable, Logger } from '@nestjs/common';

import { UploadFileDto } from './dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class FilesService {
  private readonly logger: Logger = new Logger('Files-Service');

  constructor(

  ) { }

  public async upload(uploadFileDto: UploadFileDto) {

  };

  public async findAll(paginationDto: PaginationDto) {

  };

  public async findOne(id: string) {

  };

  public async delete(id: string) {

  };
}