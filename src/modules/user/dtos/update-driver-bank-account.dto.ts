import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDriverBankAccountDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bankName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agencyNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  digit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pixKeyType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pixKey: string;
}
