import { Controller, Get, Param, Post, HttpCode, HttpStatus, Body, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';

import { PostExitsPipe } from './pipes/postExitsPipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', PostExitsPipe) id: string) {
    return await this.postsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostDetails: CreatePostDto) {
    return await this.postsService.create(createPostDetails);
  }

  

  @Delete(':id')
  async delete(@Param('id', PostExitsPipe) id: string) {
    return await this.postsService.delete(id);
  }
}