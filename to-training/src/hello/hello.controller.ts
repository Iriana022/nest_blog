import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';


@Controller('hello')
export class HelloController {
    constructor(private helloService : HelloService){}
   
    @Get('/data')
    async getJson(){
        return await this.helloService.getDataDb()
    }

    @Get('/all')
    all(){
        return this.helloService.getAllBricks()
    }

    @Get('/visa/add')
    async add(@Query('task') task: string){
        return await this.helloService.addBrick(task)
    }

    @Get('/:nom')
    getPerso(@Param('nom') nom : string){
        return this.helloService.sayhello(nom)
    }
}
