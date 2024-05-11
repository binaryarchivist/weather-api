import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export interface JwtPayload {
  username: string;
  permissions?: string[];
  role?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret:c:o:c:k',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.permissions && !payload.role) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
