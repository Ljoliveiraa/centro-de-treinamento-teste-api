import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UpdateLocationDTO } from './update-location.dto';
import { UpdateDriverBankAccountDTO } from './update-driver-bank-account.dto';
import { UpdateVehicleDTO } from './update-vehicle.dto';

export class UpdateDriverDTO {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsPhoneNumber('BR')
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  cpf: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthdate: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  statusMEI: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ type: UpdateLocationDTO })
  @IsOptional()
  address: UpdateLocationDTO;

  @ApiProperty({ type: UpdateDriverBankAccountDTO })
  @IsOptional()
  bankAccount: UpdateDriverBankAccountDTO;

  @ApiProperty({
    type: UpdateVehicleDTO,
  })
  @IsOptional()
  vehicle: UpdateVehicleDTO;
}
