import React, { useState } from "react";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
function RoomPage() {
  const navigate = useNavigate();
  const id = useId();
  const [username, setUsername] = useState("");
  const [roomid, setRoomid] = useState("");
  const handlegenerateId = (e) => {
    e.preventDefault();
    const newId = crypto.randomUUID();
    setRoomid(newId);
    console.log(roomid);
  };
  const handleCopy = (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(roomid).then(() => {
      alert("RoomId is copied to clipboard");
    });
  };
  const handleJoinRoom = () => {
    if (roomid === "" || username === "") {
      alert("please enter username and roomid");
      return;
    }
    navigate(`/chat/${roomid}/${username}`);
  };

  return (
    <div className="bg-black flex flex-col justify-center h-screen items-center text-white">
      <form className="w-100 h-80 bg-white rounded-xl flex flex-col items-center pt-10">
        <h1 className="text-purple-600 text-2xl font-bold font-serif mb-5">
          Configure Room
        </h1>
        <input
          type="text"
          value={username}
          className="bg-gray-300 p-2 rounded-md text-black min-w-85 m-3"
          placeholder="enter the username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="Room no."
            value={roomid}
            onChange={(e) => setRoomid(e.target.value)}
            className="bg-gray-300 p-2 rounded-md text-black min-w-40 m-2"
          />
          <button
            className="bg-green-600 p-2 m-1 h-10 w-18 text-center rounded-md"
            onClick={handlegenerateId}
          >
            createId
          </button>
          <button
            className="bg-green-600 p-2 h-10 w-15 m-1 text-center rounded-md"
            onClick={handleCopy}
          >
            copy
          </button>
        </div>
        <button
          onClick={handleJoinRoom}
          className="bg-green-600 p-2 h-10 w-40 text-center rounded-md m-5"
        >
          Join
        </button>
      </form>
    </div>
  );
}

export default RoomPage;
