import { PassportStrategy } from '@nestjs/passport';

import { Strategy, Profile } from 'passport-naver';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.OAUTH_NAVER_ID,
      clientSecret: process.env.OAUTH_NAVER_SECRET,
      callbackURL: process.env.OAUTH_NAVERURL,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('네이버 프로필', profile);

    return {
      email: profile.emails[0].value,
      password: profile.id,
      // name: profile.displayName,
      name: profile.emails[0].value,

      age: 0,
    };
  }
}
