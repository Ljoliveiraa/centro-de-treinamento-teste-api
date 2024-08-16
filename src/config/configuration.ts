import * as env from 'env-var';

export const appConfig = {
  port: env.get('PORT').asPortNumber(),
  databaseUrl: env.get('DATABASE_URL').required().asString(),
  jwtSecret: env.get('JWT_SECRET').required().asString(),
  cryptoSalt: env.get('CRYPTO_SALT').required().asIntPositive(),
  sendgridApiUrl: env.get('SENDGRID_API_URL').required().asString(),
  sendgridApiKey: env.get('SENDGRID_API_KEY').required().asString(),
  awsAccessKeyId: env.get('AWS_ACCESS_KEY_ID').required().asString(),
  awsSecretAccessKey: env.get('AWS_SECRET_ACCESS_KEY').required().asString(),
  awsS3Bucket: env.get('AWS_S3_BUCKET').required().asString(),
};
