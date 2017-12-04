/// <reference types="node" />
import * as net from 'net';
export declare type SocketHandle = number;
export declare class Socket {
    private tcpSockets;
    constructor();
    Create(wsServer: any, ip: string, port: number): Promise<net.Socket>;
    Send(tcp: net.Socket, data: Buffer): Promise<any>;
    Destroy(tcp: net.Socket): void;
}
