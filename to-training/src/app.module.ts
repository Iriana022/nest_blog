import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { PrismaService } from './prisma/prisma.service';
import { PostsModule } from './posts/posts.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [ChatMessage],
      synchronize: true,
      ssl: false
    }),
    HelloModule, 
    PostsModule, 
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}