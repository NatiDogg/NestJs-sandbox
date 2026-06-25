import { Controller,Get,Param,ParseIntPipe,Query,Post, HttpCode, HttpStatus, Body, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/postInterface';
import { CreatePostDto } from './dto/createPostDto';
import { UpdatePostDto } from './dto/updatePostDto';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService:PostsService){}


    @Get()
    findAll(@Query("search") search?: string):PostInterface[]{
        const extractAllPosts = this.postsService.findAll()

        if(search){
           return extractAllPosts.filter(posts=> posts.title.toLowerCase().includes(search.toLowerCase()));
           
        }

        return extractAllPosts;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number):PostInterface | string  {
        return this.postsService.findOne(id);
    }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    create( @Body() postDetails: CreatePostDto):PostInterface{
         return this.postsService.create(postDetails)
    }

    @Patch('/update/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDetails: UpdatePostDto):PostInterface{
         return this.postsService.update(id, updateDetails);
    }
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number):string{
         return this.postsService.delete(id)
    }


}
