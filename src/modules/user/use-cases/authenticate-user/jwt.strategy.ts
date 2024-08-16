import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserMapper } from 'src/modules/user/mappers/user-mapper';
import { IUserRepo } from 'src/modules/user/repositories/user-repo.interface';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('IUserRepo') private readonly userRepo: IUserRepo) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepo.findByEmail(payload.email);

    if (!user || !user.isActive)
      throw new UnauthorizedException(
        'User account deactivated or updated. Please authenticate again.',
      );

    return UserMapper.toDTO(user);
  }
}
