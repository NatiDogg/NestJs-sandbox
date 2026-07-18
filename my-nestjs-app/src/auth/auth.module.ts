import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TokenService } from 'src/utils/jwt';
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwtStrategy';
import { RoleGuard } from './guards/roleGuard';

@Module({
  imports:[UserModule,PassportModule.register({defaultStrategy:'jwt'})],

   
  controllers: [AuthController],
  providers: [AuthService,TokenService,JwtStrategy,RoleGuard],
  exports:[AuthService,JwtStrategy,RoleGuard]
})
export class AuthModule {}
