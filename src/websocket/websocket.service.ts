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
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway(3002) // To detect the in/out clients
export class WebsocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private prismaService: PrismaService) {}

  @WebSocketServer() server: Server; // Handles the

  async handleConnection(client: Socket) {
    // this.server.emit('reply', 'hello world'); // will sends the message to the interested sockets with the declared event including the client itself
    // client.emit('reply', 'hello world'); // only client will receive the message. It useful for greeting
    // client.broadcast.emit('reply', `hello guys this is me ${client.id}`); // all sockets will receive the message with execluding to the client
    const messages = await this.prismaService.message.findMany({
      where: {
        sender: {
          not: client.handshake.headers.name as string,
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });
    messages.map((message, index) => {
      client.emit('reply', {
        index: index + 1,
        message,
      });
    });
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('message') // This is the message that the users send or subscribe to it
  async handleHelloMsg(client: Socket, message: string) {
    const sender: string = client.handshake.headers.name as string;
    await this.prismaService.message.create({
      data: {
        message,
        sender,
      },
    });

    client.broadcast.emit('reply', message);
  }
}
