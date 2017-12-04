"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Project-Specific Dependencies
const server_1 = require("./server");
const socket_1 = require("./socket");
/******************************************************************************/
/*********************************** SERVER ***********************************/
/******************************************************************************/
/*********************************** Setup ************************************/
let socket = new socket_1.Socket();
let tcp = null;
server_1.wsServer.sockets.on('connection', webSocket => {
    webSocket.on('create', (create) => {
        socket.Create(server_1.wsServer, create.ip, create.port)
            .then((newSock) => tcp = newSock)
            .catch(e => console.error(e));
    });
    webSocket.on('clientData', (data) => {
        if (tcp) {
            socket.Send(tcp, Buffer.from(data))
                .catch(e => console.error(e));
        }
        else {
            console.warn('Could not send client data, socket not configured');
        }
    });
});
