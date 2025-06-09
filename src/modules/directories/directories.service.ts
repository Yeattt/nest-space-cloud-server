import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Directory } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDirectoryDto } from './dto';

@Injectable()
export class DirectoriesService {
  private readonly logger: Logger = new Logger('Directories-Service');

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  public async create(createDirectoryDto: CreateDirectoryDto) {
    const directory: Directory = await this.prismaService.directory.create({
      data: createDirectoryDto,
    });

    //* TODO: ADD A FILE RELATION WITH THE CREATED DIRECTORY

    return {
      ok: true,
      directory,
    };
  }

  public async findAll() {
    const directories: Directory[] = await this.prismaService.directory.findMany();

    return {
      ok: true,
      directories,
    };
  }

  public async findOne(id: string) {
    const directory: Directory | null = await this.prismaService.directory.findUnique({
      where: {
        id,
      },
    });

    if (!directory) {
      throw new NotFoundException(`Directory with id ${id} not found`);
    };

    return {
      ok: true,
      directory,
    };
  };
}