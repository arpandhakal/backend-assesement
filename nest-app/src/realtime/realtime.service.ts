import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: true,
})
@Injectable()
export class RealtimeService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @OnEvent('user.created')
  handleOrderCreatedEvent(event: UsersService) {
    console.log(event);
  }

  handleConnection(client: any) {
    console.log('Connected');
  }

  handleDisconnect(client: any) {
    console.log('Disconnected');
  }

  public emit(eventName: string, data: any) {
    const client = this.server.sockets.sockets;
    client.forEach((client: any) => {
      client.emit(eventName, data);
    });
  }
}
