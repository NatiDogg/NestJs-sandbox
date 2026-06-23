import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/postInterface';

@Injectable()
export class PostsService {

     private posts:Post[] = [
        {
            id: 1,
            title: "First",
            content: "First Post content",
            author: "Nati",
            createdAt: new Date()
        },
         {
            id: 2,
            title: "Second",
            content: "Second Post content",
            author: "Abebe",
            createdAt: new Date()
        }
     ]


     findAll():Post[]{
         return this.posts;
     }

     findOne(id:number): Post | string{
          const post = this.posts.find(post=> post.id === id);
          if(!post){
            return 'Post not Found'
          }

          return post;
     }

     create(postDetails: Omit<Post, 'id' | 'createdAt'>): Post{
        const newPost:Post = {
            id: this.posts.length + 1,
            ...postDetails,
            createdAt: new Date()

        }
        this.posts.push(newPost);

        return newPost;


     }

     update(id: number, updateDetails: Partial<Omit<Post, 'id' | 'createdAt'>> ):Post{
        const postIndex = this.posts.findIndex(post=> post.id === id);
        if(postIndex === -1){
            throw new NotFoundException("Post not Found to Update")
        }

        this.posts[postIndex] = {
             ...this.posts[postIndex],
             ...updateDetails,
             updatedAt: new Date ()
        }

        return this.posts[postIndex]

     }

     delete(id:number): string{
        const postIndex = this.posts.findIndex(post=> post.id === id);

        if(postIndex === -1){
            throw new NotFoundException("Post not Found to be Deleted")
        }
        this.posts.splice(postIndex,1);
        return 'Post Deleted Successfully'

     }








}
