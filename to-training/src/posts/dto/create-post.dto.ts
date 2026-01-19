import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class CreatePostDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message: 'Le titre est trop court(min  caractères)'})
    title: string

    @IsString()
    @IsNotEmpty()
    content: string
}