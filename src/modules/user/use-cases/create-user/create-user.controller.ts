import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/modules/user/dtos';
import { UserRole } from 'src/modules/user/enums';
import { Roles } from 'src/modules/user/guards/roles.decorator';
import { RolesGuard } from 'src/modules/user/guards/roles.guard';
import { UserMapper } from 'src/modules/user/mappers/user-mapper';
import { JwtAuthGuard } from '../authenticate-user/jwt-auth.guard';
import { CreateUserService } from './create-user.service';

@ApiBearerAuth()
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiTags('User')
  @Post()
  async execute(@Body() createUserDTO: CreateUserDTO) {
    const result = await this.createUserService.execute(createUserDTO);
    if (!result.success) throw new BadRequestException(result);
    return { ...result, user: UserMapper.toDTO(result.user) };
  }
}
