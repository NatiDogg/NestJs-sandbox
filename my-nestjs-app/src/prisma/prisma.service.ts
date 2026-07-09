import { Injectable,OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor( configService:ConfigService){
        const adapter = new PrismaPg({connectionString: configService.get<string>("DATABASE_URL")})

        super({adapter})
    }

    async onModuleInit() {
        
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }



}
