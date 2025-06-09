import { IsString, IsUUID, Min } from 'class-validator';

export class UploadFileDto {
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
}