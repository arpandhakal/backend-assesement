import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //return { userId: payload.sub, email: payload.email, role: payload.role };
    const user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    //getting user info
    //console.log(`Validated user: ${JSON.stringify(user)}`);

    return user;
  }
}
