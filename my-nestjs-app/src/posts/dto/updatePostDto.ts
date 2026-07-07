import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto{

    @IsOptional()
    
    @IsString({message: "Title must be a string"})
    @MinLength(3, {message: "Title must be at least 4 characters long"})
    @MaxLength(50, {message: "Title can not be longer than 50 characters"})
    title?: string;

      @IsOptional()
   
     @IsString({message: "Content must be a string"})
     @MinLength(4, {message: "Content must be at least 4 characters long"})
      

      content?: string;


       @IsOptional()
       
     @IsString({message: "Author must be a string"})
     @MinLength(4, {message: "Author must be at least 4 characters long"})
      @MaxLength(10, {message: "Author can not be longer than 10 characters"})

      author?: string


}