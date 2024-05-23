const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

let senderSocket = null;
let receiverSocket = null;

wss.on('connection', function connection(ws) {
    console.log('client connected');
    if ( receiverSocket  == null) {
        receiverSocket = ws;
    }
    ws.on('message', function incoming(message) {
        // console.log('received message:', message);
        let data = JSON.parse(message);

        console.log(data);
        message = JSON.stringify(data);

        if (data.type === 'offer') {
            senderSocket = ws;
            if (receiverSocket !== null) {
                receiverSocket.send(message);
            }
        } else if (data.type === 'answer') {
            receiverSocket = ws;
            if (senderSocket !== null) {
                senderSocket.send(message);
            }
        // } else if (data.type === 'icecandidate') {
        } else if (data.candidate) {
            console.log("I am in 3333");
            
            let destSocket = senderSocket === ws ? receiverSocket : senderSocket;
            if (destSocket !== null) {
                destSocket.send(message);
            }
        }
    });
});

