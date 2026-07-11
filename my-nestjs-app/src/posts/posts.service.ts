import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPostDto';
import { Post, Prisma } from 'prisma/generated/prisma/client';
import { UpdatePostDto } from './dto/updatePostDto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(createPostDetails: CreatePostDto): Promise<Post> {
    try {
      return await this.prisma.post.create({
        data: {
          title: createPostDetails.title,
          content: createPostDetails.content,
          author: createPostDetails.author,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatePostDetails: UpdatePostDto): Promise<Post> {
    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDetails,
        updatedAt: new Date(),
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async delete(id: string) {
    try {
      await this.prisma.post.delete({ where: { id } });
      return { message: 'Post deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw error;
    }
  }
}


     









