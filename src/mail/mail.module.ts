import { Module } from '@nestjs/common';
import { SendEmailFromTemplateService } from './providers/send-email-from-template.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SendEmailFromTemplateService],
  exports: [SendEmailFromTemplateService],
})
export class MailModule {}
