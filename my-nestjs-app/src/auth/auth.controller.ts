import { Body, Controller,Get,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';

@Controller('auth')
export class AuthController {
      
     constructor(private readonly authService:AuthService){}

     @Post('register')
     async registerUser(@Body() userInfo:RegisterDto){
            return this.authService.register(userInfo);
     }
        

}
