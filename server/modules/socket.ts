import * as net from 'net';
import * as server from './server';

export type SocketHandle = number;

export class Socket {
    private tcpSockets: net.Socket[] = [];
    constructor(
    ) {
    }
    public Create(wsServer: any, ip: string, port: number): Promise<net.Socket> {
        return new Promise((resolve, reject) => {
            let tcp = net.createConnection(port, ip);
            tcp.on('connect', () => {
               this.tcpSockets.push(tcp);
               // log.Info('Successfully connected to ' + socket.remoteAddress + ':' + socket.remotePort);
               tcp.on('data', (data: Buffer) => {
                  console.log('Data from server ' + ip + ':' + port + ' - ' + data.toString('hex'));
                  wsServer.emit('serverData', data.buffer);
               });
               resolve(tcp);
            });
            tcp.on('error', e => {
               reject('Socket connection failure! ' + e);
            });
        });
    }
    public Send(tcp: net.Socket, data: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('Data from Client - ' + data.toString('hex'));
            tcp.write(data, () => {
                resolve();
            });
        });
    }
    public Destroy(tcp: net.Socket) {
        tcp.destroy();
        delete this.tcpSockets[this.tcpSockets.indexOf(tcp)];
    }
}