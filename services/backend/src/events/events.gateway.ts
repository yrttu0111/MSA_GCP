/*
실시간 통신을 위한 socket io 

*/

import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: /\/ws-.+/ })// /\/ws-.+/  정규표현식
export class EventsGateway
implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit  {  //implements 는 반드시 구현
  @WebSocketServer() 
  public server: Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
  afterInit(server: any) {
    
  }
  handleDisconnect(client: any) {
  }
  handleConnection(client: any, ...args: any[]) {
  }
}
