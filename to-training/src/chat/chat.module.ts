import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ChatMessage } from './entities/chat.entity'
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessage]) 
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
