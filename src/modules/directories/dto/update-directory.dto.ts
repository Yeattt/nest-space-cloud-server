import { IsOptional, IsString, Min } from "class-validator";

export class UpdateDirectoryDto {
  @IsOptional()
  @IsString()
  @Min(3)
  public name: string;
}