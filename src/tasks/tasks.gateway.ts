import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer() server: Server;

  notifyTaskUpdate(taskId: string, update: any) {
    this.server.emit(`task-${taskId}`, update);
  }
}
