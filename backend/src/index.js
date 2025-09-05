import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 9090 });

let allSocket = [];
wss.on("connection", (socket) => {
  allSocket.push(socket);
  console.log("websocket server is connect at port 9090");
  socket.on("message", (data) => {
    console.log("message received on server", data.toString());
    allSocket.forEach((s) => {
      s.send(data.toString() + ": sent from the server");
    });

    socket.on("disconnect", () => {
      allSocket.filter((s) => s != socket);
    });
  });
});
