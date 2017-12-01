import * as net from 'net';
import * as server from './server';
import * as log from '@ccroy/log';

export type SocketHandle = number;

export class Socket {
    private sockets: net.Socket[] = [];
    constructor(
    ) {
    }
    public Create(receivedDataCallback: (data: Buffer) => void, ip: string, port: number): Promise<net.Socket> {
        return new Promise((resolve, reject) => {
            let socket = net.createConnection(port, ip);
            socket.on('connect', () => {
               this.sockets.push(socket);
               // log.Info('Successfully connected to ' + socket.remoteAddress + ':' + socket.remotePort);
               socket.on('data', (data: Buffer) => {
                  log.Debug('Data received on ' + ip + ':' + port + ' - ' + data.toString('hex'));
                  receivedDataCallback(data);
               });
               resolve(socket);
            });
            socket.on('error', e => {
               reject('Socket connection failure! ' + e);
            });
        });
    }
    public Send(socket: net.Socket, packet: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
            socket.write(packet, () => {
                  resolve();              
            });
        });
    }
    public Destroy(socket: net.Socket) {
      socket.destroy();
    }
}