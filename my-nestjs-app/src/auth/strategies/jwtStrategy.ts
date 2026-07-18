import {Injectable, UnauthorizedException} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'
import { ConfigService } from '@nestjs/config';
import { envConfig } from 'src/utils/envValidation';

import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private configService:ConfigService<envConfig>, private readonly userService:UserService){
          super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET_KEY')
          })
    }
    async validate(payload:{id: string, name: string, email: string, role: "ADMIN" | "User"}) {
        const user = await this.userService.findUserById(payload.id)
        if(!user){
            throw new UnauthorizedException("User doesnt exist")
        }
         return {
            ...user,
            role: payload.role
        }
    }
    
}





