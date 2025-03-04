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
  //Array that handles connected sockets info
  connectedSockets: { name: string; id: string }[] = [];
  handleConnection(client: any, ...args: any[]) {}
  handleDisconnect(client: any) {}
  @SubscribeMessage('DM')
  directMessage(client: Socket, ...args: any[]) {}
}
