import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



// protects routes that requires authentication
@Injectable()

export class JwtAuthGuard extends AuthGuard('jwt'){}

