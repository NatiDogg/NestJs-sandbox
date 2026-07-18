import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPostDto';
import { Post, Prisma } from 'prisma/generated/prisma/client';
import { UpdatePostDto } from './dto/updatePostDto';


@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(id: string): Promise<Post[]> {
    return await this.prisma.post.findMany({where:{
      authorId: id
    }});
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(createPostDetails: CreatePostDto, id: string): Promise<Post> {
    try {
      return await this.prisma.post.create({
        data: {
          title: createPostDetails.title,
          content: createPostDetails.content,
          authorId: id

        },
      });
    } catch (error) {
      throw error;
    }
  }
  async update(updatePostDetail:UpdatePostDto,postId: string, authorId: string):Promise<Post>{
       try {
        const updatedPost = await this.prisma.post.updateMany({
         where:{
          id: postId,
          authorId: authorId
         },
         data:{
           ...updatePostDetail,

         }
       })
       //updateMany returns a count object { count: 0 | 1 }. If 0, it means it wasn't found or they didn't own it.
       if(updatedPost.count === 0){
        throw new NotFoundException("Post not found or you do not have permission to edit it.")
       }
       return this.findOne(postId)
       } catch (error) {
         if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
          throw new NotFoundException('Post not found or you do not have permission to edit it.');
         }
         throw error;
       }
  }

  

  async delete(postId: string, authorId: string) {
    try {
      const result = await this.prisma.post.deleteMany({ where: { id: postId,authorId: authorId} });
      if(result.count === 0){
        throw new NotFoundException(`Post with ID ${postId} not found or unauthorized`)
      }
      return { message: 'Post deleted successfully' };
       
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }
      throw error;
    }
  }
}




     









