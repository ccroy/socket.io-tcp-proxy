var socket = null;
$(document).ready(function(){
   socket = io();
   socket.emit('create', {ip: 'localhost',  port: 23});
   socket.on('serverData', data => {
      $("#debugText").html($("#debugText").html() + JSON.stringify(data));
      $("#debugText").scrollTop(document.getElementById("debugText").scrollHeight);
      console.log(data);
   });
});

function clientData() {
   socket.emit('clientData', 'This is another test!');
}