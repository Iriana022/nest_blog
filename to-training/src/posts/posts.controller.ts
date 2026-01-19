import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor (private readonly postsService: PostsService){}

    @Get()
    async findAll(){
        return this.postsService.getAllPosts()
    }

    @Get('test-add') // Une route temporaire juste pour tester au navigateur
    async testAdd() {
    return this.postsService.createPost({
        title: "Mon premier article vers le Québec",
        content: "C'est officiel, la stack NestJS + Prisma fonctionne !"
    });
    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto){
        return this.postsService.createPost(createPostDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string){
        return this.postsService.deletePost(Number(id))
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateData: { title?:string, content?:string }){
        return this.postsService.updatePost(Number(id), updateData)
    }
}
