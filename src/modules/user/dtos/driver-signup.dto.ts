import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsBoolean,
  IsPhoneNumber,
  IsEnum,
  IsNumberString,
  IsDateString,
  IsObject,
  IsOptional,
  ValidateNested,
  Length,
  IsPositive,
  IsAlphanumeric,
} from 'class-validator';

export enum Gender {
  m = 'm',
  f = 'f',
  o = 'o',
}

export enum VehicleType {
  carro = 'carro',
  moto = 'moto',
}

export enum AccountType {
  corrente = 'corrente',
  poupança = 'poupança',
}

export enum PixType {
  cpf = 'cpf',
  email = 'email',
  telefone = 'telefone',
}
class AddressDTO {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  complement?: string;
}

class BankAccountDTO {
  @ApiProperty()
  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  agencyNumber: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  @Length(1, 1)
  digit: string;

  @ApiProperty()
  @IsEnum(PixType)
  @IsOptional()
  pixKeyType?: PixType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pixKey?: string;
}

class VehicleDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  license: string;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  manufacturingYear: number;

  @ApiProperty()
  @IsEnum(VehicleType)
  @IsNotEmpty()
  type: VehicleType;
}

export class DriverSignupDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  @Length(11, 11)
  document: string;

  @ApiProperty()
  @IsPhoneNumber('BR', {})
  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  statusMEI: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BankAccountDTO)
  bankAccount: BankAccountDTO;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => VehicleDTO)
  vehicle: VehicleDTO;
}
