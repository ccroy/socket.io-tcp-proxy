// Universal Dependencies
import * as http from 'http';
import * as io from 'socket.io';

// Configure and start server
export let port = 8080;
var server = http.createServer().listen(port);
export let wsServer = io(server);
console.log('Server running on port ' + port);