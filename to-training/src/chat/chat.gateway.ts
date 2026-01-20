import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  WebSocketServer, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Connection react
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // user connect
  async handleConnection(client: Socket) {
    const history = await this.chatService.findAll();
    
    client.emit('loadHistory', history);
    console.log(`Historique envoyé à ${client.id}`);
  }

  // user disconnect
  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté : ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { sender: string; content: string }) {
    // save
    const savedMsg = await this.chatService.create(data);
    
    // Broadcasting
    this.server.emit('receiveMessage', savedMsg);
  }
}