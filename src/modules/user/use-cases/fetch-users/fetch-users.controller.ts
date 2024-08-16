import { Controller, Get, UseGuards } from '@nestjs/common';
import { FetchUsersService } from './fetch-users.service';
import { UserMapper } from '../../mappers/user-mapper';
import { JwtAuthGuard } from '../authenticate-user/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { UserRole } from '../../enums';
import { Roles } from '../../guards/roles.decorator';

@Controller('users')
export class FetchUsersController {
  constructor(private readonly fetchUsers: FetchUsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get()
  async execute() {
    const result = await this.fetchUsers.execute({});
    return {
      status: result.status,
      data: result.data.map((e) => UserMapper.toDTO(e)),
    };
  }
}
