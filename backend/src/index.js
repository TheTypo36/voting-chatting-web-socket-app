import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 9090 });
let rooms = [];

wss.on("connection", (socket) => {
  console.log("user connected to server");
  socket.on("message", (data) => {
    let newData = JSON.parse(data.toString());

    if (newData.type === "join-room") {
      const user = {
        id: data.now,
        roomid: newData.data.roomid,
        socket: socket,
        username: newData.data.username,
      };
      rooms.push(user);

      const allUser = [];
      rooms.forEach(
        (item) => (
          item.roomid === newData.data.roomid, allUser.push(item.username)
        )
      );
      socket.send(
        JSON.stringify({
          type: "room-info",
          data: {
            users: allUser,
          },
        })
      );
      // console.log("room join", roomid);
    }
    let roomid = "";
    if (newData.type === "chat") {
      const user = rooms.find((u) => u.socket === socket);
      if (!user) return;

      console.log("user found in room", user.roomid);

      // broadcast to same room
      rooms
        .filter((u) => u.roomid == user.roomid)
        .forEach((u) => {
          u.socket.send(
            JSON.stringify({
              type: "messageFromServer",
              data: {
                message: newData.data.message,
                sender: user.id,
                username: newData.data.username,
              },
            })
          );
        });
    }
  });
  socket.on("close", () => {
    rooms = rooms.filter((r) => r.socket !== socket);
    console.log("user disconnected");
  });
});

// wss.connectionn (socket)

//router.post(req,res)
