import { IsString, IsUUID, Min } from 'class-validator';

export class UploadFilesDto {
  @IsString()
  public url: string;

  @IsString()
  @Min(3)
  public name: string;

  @IsString()
  @Min(3)
  public description: string;

  @IsUUID()
  public userId: string;

  @IsUUID()
  public directoryId: string;
}