import { PassportStrategy } from '@nestjs/passport';

import { Strategy, Profile } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.OAUTH_KAKAO_ID,
      clientSecret: process.env.OAUTH_KAKAO_SECRET,
      callbackURL: process.env.OAUTH_KAKAOURL,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('kakao 프로필', profile);
    return {
      email: profile._json.kakao_account.email,
      password: profile.id,
      name: profile.displayName,
      age: 0,
    };
  }
}
