const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

let sock1 = null;
let sock2 = null;
console.log("server start");

wss.on('connection', function connection(ws) {
    console.log('client connected');
    if ( sock1  == null) {
        sock1 = ws;
    } else {
        sock2 = ws;
    }

    ws.on('message', function incoming(message) {
        console.log("one message");
        // console.log('received message:', message);
        let data = JSON.parse(message);

        console.log("AA:" + data);
        message = JSON.stringify(data);

        if (ws === sock1) {
            sock2.send(message);
            console.log("send to sock2\n");

        } else if (ws === sock2) {
            sock1.send(message);
            console.log("send to sock1\n");

        } else {
          console.log("error...");
        }

    });
});

