import { Injectable, Logger, NotFoundException, UploadedFile } from '@nestjs/common';
import { Directory, User, File } from '@prisma/client';

import { UploadFilesDto } from './dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FilesService {
  private readonly logger: Logger = new Logger('Files-Service');

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  public async upload(files: Express.Multer.File[], uploadFilesDto: UploadFilesDto) {
    const directoryId: string = uploadFilesDto?.directoryId;
    const userId: string = uploadFilesDto?.userId;

    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    };

    const directory: Directory | null = await this.prismaService.directory.findUnique({
      where: {
        id: directoryId,
      },
    });

    if (!directory) {
      throw new NotFoundException(`Directory with id ${directoryId} not found`);
    };

    const filesToUpload = files?.map((file: Express.Multer.File) => ({
      name: file.filename,
      url: file.filename,
      directoryId,
      userId,
    }));

    const uploadedFiles = await this.prismaService.file.createMany({
      data: filesToUpload,
    });

    return {
      ok: true,
      message: 'File uploaded successfully',
      uploadedFiles,
    };
  };

  public async findAll(paginationDto: PaginationDto) {
    const totalPages: number = await this.prismaService.file.count();
    const currentPage: number = paginationDto.page;
    const perPage: number = paginationDto.limit;

    const files: File[] | null = await this.prismaService.file.findMany({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      include: {
        directory: true,
        user: true,
      },
    });


    return {
      ok: true,
      totalPages,
      currentPage,
      lastPage: Math.ceil(totalPages / perPage),
      files,
    };
  };

  public async findOne(id: string) {
    const file: File | null = await this.prismaService.file.findUnique({
      where: {
        id,
      },
      include: {
        directory: true,
        user: true,
      },
    });

    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    };

    return {
      ok: true,
      file,
    };
  };

  public async delete(id: string) {
    const { file } = await this.findOne(id);

    await this.prismaService.file.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      message: 'File deleted successfully',
      file,
    };
  };
}