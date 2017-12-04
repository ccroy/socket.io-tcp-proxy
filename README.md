# socket.io-tcp-proxy

[![NPM version](https://img.shields.io/npm/v/socket.io-tcp-proxy.svg)](https://www.npmjs.org/package/socket.io-tcp-proxy)  

TCP proxy server for socket.io websockets.

## Description

Spins up a node server locally on port 8080 by default. Connect to this using socket.io WebSockets to send and receive data to/from a TCP endpoint.

## Usage

1. Connect to server from web app.
2. Create session with remote TCP via server.
3. Add listener for data and any emitters you want.

Note: data is both sent and received as an ArrayBuffer.

### Connecting to server from web app
Example:
```JavaScript
let ws = io('http://localhost:8080');
```

### Setting up remote TCP session via server
Example:
```JavaScript
ws.emit('create', {ip: '123.456.789.012', port: 1234});
```

### Adding handler for incoming data from TCP endpoint
Example:
```JavaScript
ws.on('serverData', arrayBuffer => {
  console.log('Data received');
  // Do something with data
});
```

### Add emitters for sending data to TCP endpoint
Example:
```JavaScript
ws.emit('clientData', arraybuffer);
```

## Installation

The easiest way to install socket.io-tcp-proxy is with [`npm`][npm].

[npm]: http://npmjs.org

```sh
npm install socket.io-tcp-proxy
```

Alternately, download the source.

```sh
git clone https://github.com/ccroy/socket.io-tcp-proxy.git
```

## Command line interface

The `bin/socket.io-tcp-proxy` is a socket.io WebSocket to tcp proxy server. It accepts the following arguments:

- `-port <port number>`: Sets the port that the WebSocket will connect to.

## License

[MIT](LICENSE)