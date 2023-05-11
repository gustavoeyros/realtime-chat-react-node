import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Join = () => {
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const username = userRef.current?.value;
    if (!username?.trim()) {
      return;
    }
    const socket = io("http://localhost:3005");
    socket.emit("set_username", username);

    navigate(`/chat`);
  };
  return (
    <div>
      <h1>Join</h1>
      <input type="text" ref={userRef} placeholder="Nome" />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
};

export default Join;
