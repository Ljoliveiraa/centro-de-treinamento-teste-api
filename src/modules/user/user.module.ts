import { Module } from '@nestjs/common';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { UserRepoService } from './repositories/prisma/user-repo/user-repo.service';
import { AuthenticateUserService } from './use-cases/authenticate-user/authenticate-user.service';
import { LocalStrategy } from './use-cases/authenticate-user/local.strategy';
import { AuthenticateUserController } from './use-cases/authenticate-user/authenticate-user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './use-cases/authenticate-user/constants';
import { JwtStrategy } from './use-cases/authenticate-user/jwt.strategy';
import { HashingService } from './providers/hashing/hashing.service';
import { MailModule } from 'src/mail/mail.module';
import { FileRepositoryService } from 'src/files/providers/file-repository.service';
import { FetchUsersService } from './use-cases/fetch-users/fetch-users.service';
import { FetchUsersController } from './use-cases/fetch-users/fetch-users.controller';

@Module({
  imports: [
    MailModule,
    PrismaModule,
    JwtModule.register({
      secret: jwtConstants.jwtSecret,
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  providers: [
    CreateUserService,
    UserRepoService,
    { provide: 'IUserRepo', useExisting: UserRepoService },
    UserRepoService,
    AuthenticateUserService,
    LocalStrategy,
    JwtStrategy,
    HashingService,
    FileRepositoryService,
    { provide: 'IFileRepo', useExisting: FileRepositoryService },
    FetchUsersService,
  ],
  controllers: [CreateUserController, AuthenticateUserController, FetchUsersController],
})
export class UserModule {}
