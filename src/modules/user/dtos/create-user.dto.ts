import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  // IsNumberString,
  // IsPhoneNumber,
  // IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole, UserRoleOptions } from '../enums';

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  isActive = true;

  // @ApiProperty()
  // @IsPhoneNumber('BR', {})
  // @IsNotEmpty()
  // phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoleOptions, {
    message: 'User role must be "administrator" or "assistant"',
  })
  role: UserRole;

  // @ApiProperty()
  // @IsNumberString()
  // @IsNotEmpty()
  // rg: string;

  // @ApiProperty()
  // @IsNumberString()
  // @IsNotEmpty()
  // document: string;
}
