import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import jwt from 'jsonwebtoken'
import { User } from 'prisma/generated/prisma/client'
import { envConfig } from './envValidation'

@Injectable()
export class TokenService{
        constructor(private configService:ConfigService<envConfig>){}
      createAccessToken(user:Omit<User,'password'>){
            return jwt.sign({id: user.id, name: user.name, email:user.email, role: user.role}, this.configService.getOrThrow<string>('JWT_ACCESS_SECRET_KEY'), {expiresIn: '15m'})

      }
      createRefreshToken(user:Omit<User,'password'>){
         return jwt.sign({id: user.id, name: user.name, email:user.email, role: user.role}, this.configService.getOrThrow<string>("JWT_REFRESH_SECRET_KEY"), {expiresIn: '7d'})
      }
      verifyAccessToken(token: string){
          return jwt.verify(token, this.configService.getOrThrow<string>('JWT_ACCESS_SECRET_KEY')) as {id: string, name: string, email: string, role: 'ADMIN' | "USER"}
      }
      verifyRefreshToken(token: string){
          return jwt.verify(token, this.configService.getOrThrow<string>('JWT_REFRESH_SECRET_KEY')) as {id: string, name: string, email: string, role: 'ADMIN' | "USER"}
      }

}
