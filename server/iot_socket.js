var io = require('socket.io').listen(8888);

function iot_socket(){
    io.sockets.on('connection', function (socket) {
        socket.on('message', function () { });
        socket.on('disconnect', function () { });
    });
}

function socket(){
    console.log();
}

module.exports = iot_socket;