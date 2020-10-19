import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AccountService } from 'src/modules/account/account.service';
export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(private readonly accService: AccountService) {}
  async validateOAuthLogin(user: any) {
    try {
      if (!user) throw new InternalServerErrorException('validateOAUthLogin');
      else {
        const token = await this.accService.loginByMail(user);
        // const { token } = user;
        return token;
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const payload = {
    //     userID,
    //     provider,
    //   };
    //   const token = jwt.sign(payload, process.env.SERECT_KEY, {
    //     expiresIn: 3600,
    //   });
    //   return token
    // } catch (err) {
    //   throw new InternalServerErrorException('validateOAuthLogin', err.message);
    // }
  }
}
