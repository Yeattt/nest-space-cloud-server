import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Directory, Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateDirectoryDto, UpdateDirectoryDto } from './dto';
import { PaginationDto } from '../../common';

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

    return {
      ok: true,
      directory,
    };
  }

  public async findAll(paginationDto: PaginationDto) {
    const totalPages: number = await this.prismaService.directory.count();
    const currentPage: number = paginationDto.page;
    const perPage: number = paginationDto.limit;

    const directories: Directory[] = await this.prismaService.directory.findMany({
      skip: (currentPage - 1) * perPage,
      take: perPage,
      include: {
        user: true,
        files: true,
      },
    });

    return {
      ok: true,
      totalPages,
      currentPage,
      lastPage: Math.ceil(totalPages / perPage),
      directories,
    };
  }

  public async findOne(id: string) {
    const directory: Directory | null = await this.prismaService.directory.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        files: true,
      }
    });

    if (!directory) {
      throw new NotFoundException(`Directory with id ${id} not found`);
    };

    return {
      ok: true,
      directory,
    };
  };

  public async update(id: string, updateDirectoryDto: UpdateDirectoryDto) {
    try {
      const directory = await this.prismaService.directory.update({
        where: {
          id,
        },
        data: updateDirectoryDto,
      });

      return {
        ok: true,
        directory,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Directory with id ${id} not found`);
      };
    };
  };

  public async delete(id: string) {
    try {
      const directory = await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        message: 'Directory deleted successfully',
        directory
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Directory with id ${id} not found`);
      };
    };
  }
}