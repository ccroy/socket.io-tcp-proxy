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
let socket = new Socket();
let tcp: net.Socket | null = null;

wsServer.sockets.on('connection', webSocket => {
    webSocket.on('create', (create: any) => {
        socket.Create(wsServer, create.ip, create.port)
        .then((newSock) => tcp = newSock)
        .catch(e => console.log(e));  
     })
    webSocket.on('clientData', (data: ArrayBuffer) => {
        if(tcp) {
          socket.Send(tcp as net.Socket, Buffer.from(data))
          .catch(e => console.log(e));
        } else {
            console.log('Could not send client data, socket not configured');
        }
   });
})

app.use('/', router); // for testing proxy connection