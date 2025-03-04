// import { Injectable } from '@nestjs/common';
// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { PrismaService } from '../prisma/prisma.service';

// @WebSocketGateway(3002) // To detect the in/out clients
// export class WebsocketService
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   constructor(private prismaService: PrismaService) {}
//   //Array that handles connected sockets info
//   connectedSockets: { name: string; id: string }[] = [];

//   @WebSocketServer()
//   server: Server; // Handles the

//   async handleConnection(client: Socket) {
//     // similar to io.on
//     // this.server.emit('reply', 'hello world'); // will sends the message to the interested sockets with the declared event including the client itself
//     // client.emit('reply', 'hello world'); // only client will receive the message. It useful for greeting
//     // client.broadcast.emit('reply', `hello guys this is me ${client.id}`); // all sockets will receive the message with execluding to the client
//     const name: string = client.handshake.headers.name as string;
//     //Register the connected socket to the array
//     this.connectedSockets.push({ id: client.id, name });
//     //The below logic is to emit all stored messages starting form the oldest one
//     const messages = await this.prismaService.message.findMany({
//       where: {
//         sender: {
//           not: name,
//         },
//       },
//       orderBy: {
//         created_at: 'asc',
//       },
//     });
//     messages.map((message, index) => {
//       client.emit('reply', {
//         index: index + 1,
//         message: {
//           sender: message.sender,
//           content: message.message,
//         },
//       });
//     });
//   }
//   handleDisconnect(client: Socket) {
//     const index = this.sockets.findIndex((socket) => socket.id === client.id);
//     this.sockets.splice(index, 1);
//   }
//   @SubscribeMessage('messaage') // This is the message that the users send or subscribe to it
//   async handleHelloMsg(client: Socket, message: string | string[]) {
//     const sender: string = client.handshake.headers.name as string;
//     let receiver;
//     if (Array.isArray(message)) {
//       receiver = message[1];
//       console.log(receiver);
//       const socket_id = this.sockets.find((socket) => socket.name === receiver);
//       console.log(socket_id);
//       console.log(this.sockets);
//       if (socket_id) {
//         client.to(socket_id.id).emit('reply', message);
//       } else {
//         client.broadcast.emit('reply', message);
//       }
//     } else {
//       await this.prismaService.message.create({
//         data: {
//           message,
//           sender,
//         },
//       });
//       client.broadcast.emit('reply', message);
//     }
//   }
//   @SubscribeMessage('join-room')
//   joinRoom(client: Socket, msg) {
//     client.join(msg);
//   }
// }
