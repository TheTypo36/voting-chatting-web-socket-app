import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [allmessage, setAllMessage] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { roomid, username } = useParams();

  useEffect(() => {
    const ws = new WebSocket("ws://0.0.0.0:9090");

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join-room",
          data: { roomid: roomid, username: username },
        })
      );
    };
    ws.onmessage = (ev) => {
      const newData = JSON.parse(ev.data);
      if (newData.type === "room-info") {
        setAllUsers(newData.data.users);
      }
      if (newData.type === "messageFromServer") {
        setAllMessage((prev) => [...prev, newData.data]);
      }
    };

    return () => ws.close();
  }, [roomid, username]);

  const handleSendBtn = (e) => {
    e.preventDefault();
    if (socket === null) {
      alert("no connection established");
      return;
    }
    setMessage("");
    socket.send(
      JSON.stringify({
        type: "chat",
        data: { message: message, username: username },
      })
    );
  };

  return (
    <div className="min-h-screen w-full bg-cyan-100 flex flex-col py-4 px-2 sm:px-4">
      <div className="w-full mt-10 max-w-[85vw] flex flex-row justify-between items-center mb-4 text-base sm:text-lg font-bold">
        <span className="bg-black text-red-400 p-2 rounded-md text-xs sm:text-base">
          RoomId: {roomid && roomid?.toUpperCase()}
        </span>
        <span className="bg-black text-green-700 p-2 rounded-md text-xs sm:text-base">
          Online Users: {allUsers.length}
        </span>
      </div>

      <div className="w-full max-w-[85vw] flex flex-col sm:flex-row gap-4">
        {/* Chat Section */}
        <div className="flex-1 h-[70vh] sm:h-[80vh] rounded-xl bg-black text-white p-2 sm:p-6 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-2">
            {allmessage.map((item, index) => (
              <div className="m-2 sm:m-4" key={index}>
                <span className="bg-white text-black p-2 rounded-sm break-words text-xs sm:text-base">
                  {item.username}: {item.message}
                </span>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendBtn}
            className="w-full flex gap-2 bg-white text-gray-500 rounded-md p-2"
          >
            <input
              type="text"
              value={message}
              placeholder="Type your message"
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 rounded-md text-xs sm:text-base outline-none"
            />
            <button
              type="submit"
              className="bg-purple-400 text-black px-4 py-2 rounded-md text-xs sm:text-base"
            >
              Send
            </button>
          </form>
        </div>
        {/* User List Section */}
        <div className="bg-black text-white p-5 rounded-md w-full sm:w-1/3 h-auto sm:h-[80vh] flex flex-col">
          <div className="text-red-500 mb-4">see you friends</div>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {allUsers &&
              allUsers.map((user, idx) => (
                <div className="m-2" key={idx}>
                  <span className="bg-white p-2 rounded-md text-purple-400">
                    {user}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
