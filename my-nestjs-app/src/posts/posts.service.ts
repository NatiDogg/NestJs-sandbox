import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPostDto';
import { Post } from 'prisma/generated/prisma/client';


@Injectable()
export class PostsService {

    constructor(private prisma:PrismaService){}

    async findAll():Promise<Post[]>{
        return await this.prisma.post.findMany()
    }

    async findOne(id: string):Promise<Post>{
        const post = await this.prisma.post.findUnique({where: {
            id
        }})

        if(!post){
            throw new NotFoundException(`Post with ID ${id} not found`)
        }

        return post
    }

    async create(createPostDetails:CreatePostDto): Promise<Post>{
        try {
           return await this.prisma.post.create({data:{
            title: createPostDetails.title,
            content: createPostDetails.content,
            author: createPostDetails.author

        }})
        } catch (error) {
            throw error
        }
    }


     









}
