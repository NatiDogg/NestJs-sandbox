import {IsNotEmpty, IsString,IsNumber, MinLength, MaxLength, IsEmail } from 'class-validator'

export class RegisterDto{

    @IsNotEmpty({message: 'Name is required!'})
    @IsString({message: 'Name must be a string'})
    @MinLength(2,{message: "name must be atleast 2 characters long"})
     @MaxLength(12,{message: "name can not be longer than 12 charactres"})
    name!: string

    @IsEmail({},{message: "Please provide a valid email"})
     email!: string

    @IsNotEmpty({message: "Password is required!"})
    @MinLength(6,{message: "Password must be atleast 6 characters long"})
    password!: string
    


    
}