import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client'

@Injectable()
export class PostsService {
    constructor(private prisma : PrismaService){}

    async getAllPosts(): Promise<Post[]>{
        return this.prisma.post.findMany({
            orderBy: {createdAt: 'desc'}
        })
    }

    async createPost(dto: CreatePostDto): Promise<Post>{
        return this.prisma.post.create({
            data:{
                title: dto.title,
                content: dto.content,
                published: true
            }
        })
    }

    async deletePost(id: number): Promise<Post>{
        return this.prisma.post.delete({
            where : {id},
        })
    }

    async updatePost(id: number, data: {title?: string, content?: string}): Promise<Post>{
        return this.prisma.post.update({
            where: {id},
            data
        })
    }
}
