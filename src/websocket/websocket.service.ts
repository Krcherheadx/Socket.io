import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(3002) // To detect the in/out clients
export class WebsocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server; // Handles the
  handleConnection(client: Socket) {
    this.server.emit('reply', 'hello world');
    // client.emit('reply', 'hello world');
    // client.broadcast.emit('reply', 'hello world');
  }
  handleDisconnect(client: Socket) {}

  @SubscribeMessage('hello') // This is the message that the users send or subscribe to it
  handleHelloMsg(client: Socket, message: any) {
    this.server.emit(
      'reply',
      `Hello, I'm :${client.id}, and this my message: ${message}`,
    );
  }
}
