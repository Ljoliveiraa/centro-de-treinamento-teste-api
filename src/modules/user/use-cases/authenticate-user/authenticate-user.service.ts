import { Inject, Injectable } from '@nestjs/common';
import { IUserRepo } from 'src/modules/user/repositories/user-repo.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateUserService {
  constructor(
    @Inject('IUserRepo') private readonly userRepo: IUserRepo,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  getAccessToken(user: any): string {
    const payload = {
      email: user.email,
      role: user.type,
    };
    return this.jwtService.sign(payload);
  }
}
