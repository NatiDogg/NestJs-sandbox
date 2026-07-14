import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import jwt from 'jsonwebtoken'
import { User } from 'prisma/generated/prisma/client'
import { envConfig } from './envValidation'

@Injectable()
export class TokenService{
        constructor(private configService:ConfigService){}
      createAccessToken(user: Omit<User, 'password'>){
            return jwt.sign(user, this.configService.getOrThrow<string>("JWT_ACCESS_SECRET_KEY"), {expiresIn: '15m'})

      }
}
