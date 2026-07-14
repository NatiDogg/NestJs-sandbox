import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { RegisterDto } from './dto/registerDto';
import { UserService } from 'src/user/user.service';
import {hashPassword,matchPassword} from '../utils/bcryptjs'
import { LoginDto } from './dto/loginDto';
import { User } from 'prisma/generated/prisma/client';

@Injectable()
export class AuthService {

      constructor(private readonly userService:UserService){}
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

    private generateResponseToken(user:Omit<User, 'password'>, message: string){
          
    }



}
