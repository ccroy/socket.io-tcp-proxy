// Universal Dependencies
import * as net from 'net';
// Project-Specific Dependencies
import { wsServer } from './server';
import { Socket } from './socket';
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
        .catch(e => console.error(e));  
     })
    webSocket.on('clientData', (data: ArrayBuffer) => {
        if(tcp) {
          socket.Send(tcp as net.Socket, Buffer.from(data))
          .catch(e => console.error(e));
        } else {
            console.warn('Could not send client data, socket not configured');
        }
   });
})