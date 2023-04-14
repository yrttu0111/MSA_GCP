
import { CACHE_MANAGER, Inject, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // req.headers.Authorization...
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // console.log("req:",req);
    // console.log("payload:",payload);
    const access = req.headers.authorization.replace('Bearer ', '');
    const check = await this.cacheManager.get(access);
    if (check) {
      throw new UnauthorizedException();
    }
    // console.log(payload); // { email: c@c.com, sub: qkwefuasdij-012093sd }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
