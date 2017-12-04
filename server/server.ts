// Universal Dependencies
import * as http from 'http';
import * as io from 'socket.io';

// Configure and start server
export let port = '8080';
let args = process.argv.slice(2);
if(args && args.length > 1) {
  if(args[0] == '-port' || args[0] == '-p') {
    port = args[1];
  }
}
var server = http.createServer().listen(port);
export let wsServer = io(server);
console.log('Server running on port ' + port);