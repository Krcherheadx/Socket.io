import { Module } from '@nestjs/common';

import { WebsocketService } from './websocket.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WebsocketService],
})
export class WebsocketModule {}
