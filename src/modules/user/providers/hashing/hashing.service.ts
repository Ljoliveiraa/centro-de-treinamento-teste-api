import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { appConfig } from 'src/config/configuration';

@Injectable()
export class HashingService {
  async hash(data: string) {
    return await bcrypt.hash(data, appConfig.cryptoSalt);
  }
}
