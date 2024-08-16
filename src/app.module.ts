import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infra/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [PrismaModule, UserModule, MailModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
