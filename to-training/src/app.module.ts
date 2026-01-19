import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { PrismaService } from './prisma/prisma.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [HelloModule, PostsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
