import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export class PostExitsPipe implements PipeTransform {
  constructor(private readonly postsService: PostsService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    await this.postsService.findOne(value);
    return value;
  }
}

                 


    
