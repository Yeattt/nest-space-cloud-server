import { IsString, IsUUID, Min } from 'class-validator';

export class CreateDirectoryDto {
  @IsString()
  @Min(3)
  public name: string;

  @IsUUID()
  public userId: string;
}