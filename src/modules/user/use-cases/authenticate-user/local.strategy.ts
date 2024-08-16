import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticateUserService } from './authenticate-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authUser: AuthenticateUserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authUser.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    if (!user.isActive)
      throw new UnauthorizedException('User account deactivated');
    return user;
  }
}
