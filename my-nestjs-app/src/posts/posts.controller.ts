import { Controller, Get, Param, Post, HttpCode, HttpStatus, Body, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPostDto';
import { UpdatePostDto } from './dto/updatePostDto';
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

  @Patch(':id')
  async update(@Param('id', PostExitsPipe) id: string, @Body() updatePostDetails: UpdatePostDto) {
    return await this.postsService.update(id, updatePostDetails);
  }

  @Delete(':id')
  async delete(@Param('id', PostExitsPipe) id: string) {
    return await this.postsService.delete(id);
  }
}