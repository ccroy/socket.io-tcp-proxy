"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
class Socket {
    constructor() {
        this.tcpSockets = [];
    }
    Create(wsServer, ip, port) {
        return new Promise((resolve, reject) => {
            let tcp = net.createConnection(port, ip);
            tcp.on('connect', () => {
                this.tcpSockets.push(tcp);
                console.info('Successfully opened tcp socket to ' + ip + ':' + port);
                tcp.on('data', (data) => {
                    console.log('Data from server - ' + data.toString('hex'));
                    wsServer.emit('serverData', data.buffer);
                });
                resolve(tcp);
            });
            tcp.on('error', e => {
                reject('Socket connection failure! ' + e);
            });
        });
    }
    Send(tcp, data) {
        return new Promise((resolve, reject) => {
            console.log('Data from client - ' + data.toString('hex'));
            tcp.write(data, () => {
                resolve();
            });
        });
    }
    Destroy(tcp) {
        tcp.destroy();
        delete this.tcpSockets[this.tcpSockets.indexOf(tcp)];
    }
}
exports.Socket = Socket;
