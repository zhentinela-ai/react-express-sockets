import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    const receiveMessage = (message) => console.log(message);

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>send</button>
      </form>
    </div>
  );
}

export default App;
