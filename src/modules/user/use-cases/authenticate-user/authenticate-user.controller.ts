import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserDTO } from 'src/modules/user/dtos/authenticate-user.dto';
import { AuthenticateUserService } from './authenticate-user.service';

@Controller('users')
export class AuthenticateUserController {
  constructor(private readonly authenticateUser: AuthenticateUserService) {}

  @ApiExtraModels(AuthenticateUserDTO)
  @UseGuards(AuthGuard('local'))
  @ApiTags('User')
  @Post('/login')
  async execute(@Request() req, @Body() authUserDto: AuthenticateUserDTO) {
    const accessToken = this.authenticateUser.getAccessToken(req.user);
    return {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      accessToken,
    };
  }
}
