import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class FormDataDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum([
    'name',
    'email',
    'document',
    'gender',
    'birthdate',
    'phone',
    'state',
    'city',
    'district',
    'zipcode',
    'street',
    'number',
    'complement',
    'vehicle.type',
    'vehicle.manufacturingYear',
    'vehicle.brand',
    'vehicle.model',
    'vehicle.license',
    'vehicle.photo',
    'driverLicense',
    'vehicleLicense',
    'residentialCertificate',
    'bankAccount.accountType',
    'bankAccount.accountNumber',
    'bankAccount.bankName',
    'bankAccount.agencyNumber',
    'bankAccount.digit',
    'bankAccount.pixKey',
    'bankAccount.pixKeyType',
  ])
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class DisapproveDriverSignupDTO {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsObject({ each: true })
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => FormDataDTO)
  formData: Array<{ name: string; reason: string }>;
}
