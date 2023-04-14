import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy} from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        if(cookie){
        const refreshToken = cookie.replace('refreshToken=', '');
        // console.log(req);
        return refreshToken;
        }
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // console.log(req);
    const access = req.headers.cookie.replace('refreshToken=', '');
    const check = await this.cacheManager.get(access);
    if (check) {
      throw new UnauthorizedException();
    }
    console.log(payload); // { email: c@c.com, sub: qkwefuasdij-012093sd }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
