import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { RegisterDto } from './dto/registerDto';
import { UserService } from 'src/user/user.service';
import {hashPassword,matchPassword} from '../utils/bcryptjs'
import { LoginDto } from './dto/loginDto';
import { User } from 'prisma/generated/prisma/client';
import { TokenService } from 'src/utils/jwt';

@Injectable()
export class AuthService {

      constructor(private readonly userService:UserService, private readonly tokenService:TokenService){}
    async register(userInfo:RegisterDto){
        const normalizedEmail = userInfo.email.toLowerCase()
        const hashedPassword = await hashPassword(userInfo.password)

        const registeredUser = await this.userService.createUser({
            name: userInfo.name,
            email: normalizedEmail,
            password: hashedPassword,
            
         })
         return {
            user: registeredUser,
            message: "User Registered Successfully"
         }

    }

    async createAdmin(adminInfo: RegisterDto){
            const normalizedEmail = adminInfo.email.toLowerCase()
            const hashedPassword = await hashPassword(adminInfo.password);

            const createdAdmin = await this.userService.createAdmin({
                name: adminInfo.name,
                email: normalizedEmail,
                password: hashedPassword
            })
            return {
                user: createdAdmin,
                message: "Admin Created Successfully"
            }
    }
    async login(userInfo: LoginDto){
        const normalizedEmail = userInfo.email.toLowerCase()
        const existingUser = await this.userService.findByEmail(normalizedEmail)

        if(!existingUser){
            throw new UnauthorizedException("Invalid Credentials!")
        }
        const comparePassword = await matchPassword(userInfo.password,existingUser.password);

        if(!comparePassword){
            throw new UnauthorizedException("Invalid Credentials!")
        }

        
         
        const {password, ...safeUser} = existingUser



           return this.generateResponseToken(safeUser,'User LoggedIn Successfully')
        


    }
    async refreshToken(token: string){
        try {
            const payload = this.tokenService.verifyRefreshToken(token)
            const user = await this.userService.findUserById(payload.id)
            if(!user){
                 throw new UnauthorizedException("Invalid Token")
            }
            return this.generateResponseToken(user,'refresh token updated')
        } catch (error) {
            throw new UnauthorizedException("Invalid Token")
        }
    }

    private generateResponseToken(user:Omit<User,'password'>, message: string){
        
           const accessToken = this.tokenService.createAccessToken(user)
           const refreshToken = this.tokenService.createRefreshToken(user)

           return {
            user: user,
            message: message,
            accessToken: accessToken,
            refreshToken: refreshToken
           }
    }



}
