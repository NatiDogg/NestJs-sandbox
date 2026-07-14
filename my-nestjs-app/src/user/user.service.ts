import { BadRequestException, Injectable } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma,User } from 'prisma/generated/prisma/client';

@Injectable()
export class UserService {

    constructor(
       private readonly helloService:HelloService,
       private readonly prisma:PrismaService
     
    ){}

    async createUser(userDetails: {name: string, email: string, password: string}): Promise<Omit<User, 'password'>>{
          try {
             const newlyCreatedUser = await this.prisma.user.create({data:{
             ...userDetails

         }, omit: {password: true}})
           return newlyCreatedUser;

          } catch (error) {
              if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' ){
                throw new BadRequestException("Email already in use")
              }
              throw error;
          }

         
    }
    async createAdmin(adminDetails:{name: string, email: string, password: string}): Promise<Omit<User, "password">>{

        try {
            const newlyCreatedAdmin = await this.prisma.user.create({data:{
                 ...adminDetails,
                 role: 'ADMIN'
            }, omit: {password: true}})
            return newlyCreatedAdmin

        } catch (error) {
             if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
                throw new BadRequestException("Email already in use")
             }
              throw error;
        }

    }
    async getAllUsers(): Promise<User[]>{
        return await this.prisma.user.findMany()
    }

    async findByEmail(email: string): Promise<User | null>{
         return await this.prisma.user.findUnique({where:{
            email: email
         }})
    }

    

    
   

}
