import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AccountService } from 'src/modules/account/account.service';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly accService: AccountService,
  ) {
    super({
      clientID:
        '77811519322-ql91kcrslkc4o4to52julgknbou38r6f.apps.googleusercontent.com', // <- Replace this with your client id
      clientSecret: '7L1KDRYuHkna2MC9QMxX6Apo', // <- Replace this with your client secret
      callbackURL: 'http://localhost:4000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails } = profile;
      const user = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        accessToken,
      };
      // const token: string = await this.authService.validateOAuthLogin(dataMail);
      // const token: string = await this.accService.loginByMail(data);
      // const user = {
      //   token,
      // };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
