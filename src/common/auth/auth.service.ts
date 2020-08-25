import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor() {}
  async validateOAuthLogin(userID: string, provider: Provider) {
    try {
      const payload = {
        userID,
        provider,
      };

      const token = jwt.sign(payload, process.env.SERECT_KEY, {
        expiresIn: 3600,
      });
      return token;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
