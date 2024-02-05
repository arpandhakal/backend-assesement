import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: true,
})
@Injectable()
export class RealtimeService {
  @WebSocketServer() //class\ connection = handshake
  server: Server;

  public emit(eventName: string, data: any) {
    const clients = this.server.sockets.sockets;

    clients.forEach((client: any) => {
      client.emit(eventName, data);
    });
  }
}
