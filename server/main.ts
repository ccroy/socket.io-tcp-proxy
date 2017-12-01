// Universal Dependencies
import * as net from 'net';
import * as fs from 'fs';
import { Router } from 'express';
// Project-Specific Dependencies
import { router } from './routes';
import { app, wsServer } from './modules/server';
import { Socket } from './modules/socket';
/******************************************************************************/
/*********************************** SERVER ***********************************/
/******************************************************************************/
/*********************************** Setup ************************************/
let tcpSock = new Socket();
let sock: net.Socket | null = null;

wsServer.sockets.on('connection', socket => {
   socket.on('clientData', (data: string) => {
      tcpSock.Send(sock as net.Socket, Buffer.from(data))
      .catch(e => console.log(e));
   });
   socket.on('create', (create: any) => {
      tcpSock.Create(ForwardResponse, create.ip, create.port)
      .then((newSock) => sock = newSock)
      .catch(e => console.log(e));  
   })
})

function ForwardResponse(data: Buffer) {
   wsServer.emit('serverData', new Uint8Array(data.buffer));
}

app.use('/', router);