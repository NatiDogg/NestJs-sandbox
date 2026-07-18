import { Controller, Get, Param, Post, HttpCode, HttpStatus, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';

import { PostExitsPipe } from './pipes/postExitsPipe';
import { CurrentUser } from 'src/auth/decorators/currentUserDecorator';
import { User } from 'prisma/generated/prisma/client';
import { UpdatePostDto } from './dto/updatePostDto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async findAll(@Param('id') id: string) {
    return await this.postsService.findAll(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', PostExitsPipe) id: string) {
    return await this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDetails: CreatePostDto, @CurrentUser() user: Omit<User, 'password'>) {
    return await this.postsService.create(createPostDetails,user.id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') postId:string,@Body() updatePostDetails:UpdatePostDto,@CurrentUser() user:Omit<User,'password'>){
     return await this.postsService.update(updatePostDetails, postId,user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', PostExitsPipe) postId: string, @CurrentUser() user:Omit<User,'password'> ) {
    return await this.postsService.delete(postId,user.id);
  }
}