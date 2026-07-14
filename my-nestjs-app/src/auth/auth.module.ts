import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TokenService } from 'src/utils/jwt';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService,TokenService]
})
export class AuthModule {}
