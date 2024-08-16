import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'aws-sdk';
import { Socket } from 'socket.io';
import { JwtStrategy } from 'src/modules/user/use-cases/authenticate-user/jwt.strategy';

type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;

export const AuthWsMiddleware = (
  jwtService: JwtService,
  configService: ConfigService,
  // userService: UserService,
): SocketMiddleware => {
  return async (socket: Socket, next) => {
    try {
      const token = socket.handshake?.auth?.token;

      if (!token) {
        throw new Error('Authorization token is missing');
      }

      // let payload: JwtTokenPayload | null = null;

      try {
        // payload = await jwtService.verifyAsync<JwtTokenPayload>(token);
      } catch (error) {
        throw new Error('Authorization token is invalid');
      }

      // const strategy = new JwtStrategy(configService, userService);
      // const user = await strategy.validate(payload);

      // if (!user) {
      //   throw new Error('User does not exist');
      // }

      // socket = Object.assign(socket, {
      //   user: user!,
      // });
      next();
    } catch (error) {
      next(new Error('Unauthorized'));
    }
  };
};
