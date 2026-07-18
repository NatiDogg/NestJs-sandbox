import { Body, Controller,Get,Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { JwtAuthGuard } from './guards/jwtAuthGuard';
import { CurrentUser } from './decorators/currentUserDecorator';
import { Role, User } from 'prisma/generated/prisma/client';
import { Roles } from './decorators/rolesDecorator';
import { RoleGuard } from './guards/roleGuard';

@Controller('auth')
export class AuthController {
      
     constructor(private readonly authService:AuthService){}

     @Post('register')
     async registerUser(@Body() userInfo:RegisterDto){
            return this.authService.register(userInfo);
     }
     @Post('login')
     async loginUser(@Body() userInfo:LoginDto){
           return this.authService.login(userInfo)
     }
     @Post("create-admin")
      @Roles(Role.ADMIN)
     @UseGuards(JwtAuthGuard,RoleGuard)
     async CreateAdmin(@Body() adminInfo:RegisterDto){
          return this.authService.createAdmin(adminInfo)
     }
     @Post("refresh")
     async refreshToken(@Body('refreshToken') refreshToken: string){
            return this.authService.refreshToken(refreshToken)
     }

     @UseGuards(JwtAuthGuard)
     @Get('me')
     async getProfile(@CurrentUser() user:Omit<User, 'password'>):Promise<Omit<User, 'password'>>{
        return user
     }


}
