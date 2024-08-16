import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { appConfig } from 'src/config/configuration';

@Injectable()
export class SendEmailFromTemplateService {
  constructor(private readonly httpService: HttpService) {}

  async send(params: {
    data: any;
    templateId: string;
    subject: string;
    toEmail: string;
    toName: string;
  }) {
    try {
      await this.httpService.axiosRef.post(
        `${appConfig.sendgridApiUrl}/v3/mail/send`,
        {
          personalizations: [
            {
              to: [
                {
                  email: params.toEmail,
                  name: params.toName,
                },
              ],
              dynamic_template_data: params.data,
            },
          ],
          from: {
            email: 'suporte@navegamlog.com.br',
            name: 'Suporte NavegamLOG',
          },
          template_id: params.templateId,
          subject: params.subject,
        },
        { headers: { Authorization: `Bearer ${appConfig.sendgridApiKey}` } },
      );
    } catch (error) {
      throw error;
    }
  }
}
