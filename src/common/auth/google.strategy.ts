import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '77811519322-ql91kcrslkc4o4to52julgknbou38r6f.apps.googleusercontent.com', // <- Replace this with your client id
      clientSecret: '7L1KDRYuHkna2MC9QMxX6Apo', // <- Replace this with your client secret
      callbackURL: 'http://localhost:4000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
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
      console.log(profile);
      const jwt: string = await this.authService.validateOAuthLogin(
        profile.id,
        Provider.GOOGLE,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
