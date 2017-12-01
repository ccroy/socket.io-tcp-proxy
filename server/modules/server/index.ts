// Universal Dependencies
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import * as fs from 'fs';
import * as io from 'socket.io';
var externalIp = require('external-ip')();

// Project-Specific Dependencies
import * as settings from './config';

// Globals Variables

export let app: express.Express = express();
var server = app.listen(settings.port, settings.ip); // TODO: server var not actually called out anywhere, could get rid of it.
export let wsServer = io(server);
var serverRoute = settings.ip + ':' + settings.port;
console.log('Server running at ' + serverRoute);

let expirationCallback: any = null;
// Get external-facing IP address
externalIp(function(err: any, ip: any) {
   if (err) {
      throw err;
   }
   console.log('External-facing IP address: ' + ip);
});
app.set('views', process.cwd() + '/' + settings.view.subDir);
app.set('view engine', settings.view.engine);
// Middleware setup
app.use(bodyParser.json({
   limit: '1mb'
}));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.raw());

app.use(function(request: any, response: any, next: any) {
   response.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   next();
});

app.use(express.static(process.cwd() + '/resources')); // Used to load page resources