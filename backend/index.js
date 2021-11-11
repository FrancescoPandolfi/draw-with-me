const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {

  console.log(socket.id);

  // socket.join("ROOM1");

  socket.on('join room', (url) => {
    socket.join("ROOM1");
  });

  socket.on('conn', (url) => {
    socket.to("ROOM1").emit("connected", url);
  });

  socket.on('start draw', ([x, y]) => {
    socket.to("ROOM1").emit("start drawing", [x, y]);
  });
  socket.on('finish draw', () => {
    socket.to("ROOM1").emit("finish drawing");
  });
  socket.on('draw', ([x, y]) => {
    socket.to("ROOM1").emit("drawing", [x, y]);
  });

});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
