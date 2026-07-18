import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "prisma/generated/prisma/enums";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/rolesDecorator";


//workflow..... client->jwtauthguard->rolesguard->fail or proceed to the controller


@Injectable()

export class RoleGuard implements CanActivate{

      ///reflector is a utility that will help to access the metadata
       constructor(private reflector:Reflector){}


       //canactivate method is like next() in express middleware
       

       canActivate(context: ExecutionContext): boolean {
         // retrive the roles metadata set by the roles decorator 
           const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[context.getHandler(), context.getClass()])

           if(!requiredRoles){
            return true
           }

           const {user} = context.switchToHttp().getRequest()
           if(!user){
            throw new ForbiddenException("User is not authenticated")
           }
           const hasRequiredRole = requiredRoles.some(role=> user.role === role)
         
           if(!hasRequiredRole){
            throw new ForbiddenException('Access denied. You do not have the required permissions.');
           }
           return true

       }
}