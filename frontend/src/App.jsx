import { Link } from "react-router-dom";
function App() {
  return (
    <div className="bg-black flex flex-col justify-center h-screen items-center text-white">
      <div
        className="flex flex-col items-center
       justify-around"
      >
        <h1 className="text-3xl">
          Welcome to Ashish's websocket project, disappearing message chat Room
          Service. Let's get started..🎉
        </h1>
        <Link
          to="/configure-room"
          className="bg-green-600 p-2 h-10 w-40 text-center rounded-md m-10"
        >
          {" "}
          Create / Join Room
        </Link>
      </div>
    </div>
  );
}

export default App;
