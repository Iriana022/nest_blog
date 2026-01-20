import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat.entity';

@Injectable()
export class ChatService {

  constructor(
    @InjectRepository(ChatMessage)
    private chatRepository: Repository<ChatMessage>,
  ) {}

  async create(data: { sender: string; content: string }) {
    const newMessage = this.chatRepository.create(data);
    return await this.chatRepository.save(newMessage);
  }

  async findAll() {
    return await this.chatRepository.find({
      order: { createdAt: 'ASC' },
      take: 50, // 50 last chat
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
