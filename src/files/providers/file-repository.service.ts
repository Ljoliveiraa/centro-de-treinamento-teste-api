import { Injectable } from '@nestjs/common';
import { IFileRepo } from '../file-repo.interface';
import { appConfig } from 'src/config/configuration';
import * as crypto from 'crypto';
import * as AWS from 'aws-sdk';

export type IFile = {
  location: string;
  name: string;
  extension: string;
};

@Injectable()
export class FileRepositoryService implements IFileRepo {
  private readonly client: AWS.S3;

  constructor() {
    this.client = new AWS.S3({
      accessKeyId: appConfig.awsAccessKeyId,
      secretAccessKey: appConfig.awsSecretAccessKey,
    });
  }

  async upload(file: Buffer, mimetype: string, path: string): Promise<string> {
    const objectKey = `${path}/${crypto.randomBytes(4).toString('hex')}`;
    const result = await this.client
      .upload({
        Bucket: appConfig.awsS3Bucket,
        Body: file,
        ContentType: mimetype,
        Key: objectKey,
        ACL: 'public-read',
      })
      .promise();
    return result.Location;
  }

  async remove(key: string): Promise<void> {
    const input = {
      Bucket: appConfig.awsS3Bucket,
      Key: key,
    };

    this.client.deleteObject(input, (err, data) => {
      if (err) return false;
      return true;
    });
  }
}
