import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({ namespace: 'notification' })
export class NotificationGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    console.log('ws initialized');
    return server;
  }
}
