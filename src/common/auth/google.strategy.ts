import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
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
    res: any,
    token: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      console.log(profile);
    } catch (error) {
      console.log(error);
    }
  }
}
