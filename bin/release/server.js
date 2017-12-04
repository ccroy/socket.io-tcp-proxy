"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Universal Dependencies
const http = require("http");
const io = require("socket.io");
// Configure and start server
exports.port = '8080';
let args = process.argv.slice(2);
if (args && args.length > 1) {
    if (args[0] == '-port' || args[0] == '-p') {
        exports.port = args[1];
    }
}
var server = http.createServer().listen(exports.port);
exports.wsServer = io(server);
console.log('Server running on port ' + exports.port);
