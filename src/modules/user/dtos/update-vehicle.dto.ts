import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVehicleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  license: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  manufacturingYear: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;
}
