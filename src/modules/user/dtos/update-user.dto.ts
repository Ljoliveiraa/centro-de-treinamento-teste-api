import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { UserRole, UserRoleOptions } from '../enums';

export class UpdateUserDTO {
  @ApiProperty({
    enum: UserRoleOptions,
    required: false,
  })
  @IsEnum(UserRoleOptions, {
    message: UserRoleOptions.filter((e) => e !== UserRole.Supervisor).join(
      ', ',
    ),
  })
  @IsOptional()
  role: UserRole;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
