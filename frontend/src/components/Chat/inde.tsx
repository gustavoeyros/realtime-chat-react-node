import { useContext, useEffect, useRef, useState } from "react";
import { ISocket } from "../../interfaces/join";
import { SocketContext } from "../../store/socket-context";

const Chat = () => {
  const { socket } = useContext(SocketContext) as ISocket;

  const messageRef = useRef<HTMLInputElement>(null);
  const [messageList, setMessageList] = useState<any>([]);

  useEffect(() => {
    socket.on("received_message", (data: any) => {
      setMessageList((list: any) => [...list, data]);
    });

    return () => socket.off("received_message");
  }, [socket]);

  const handleSubmit = () => {
    const message = messageRef.current?.value;

    if (!message?.trim()) {
      return;
    }

    socket.emit("message", message);
    clearInput();
  };

  const clearInput = () => {
    messageRef.current!.value = "";
  };
  return (
    <div>
      <h1>Chat</h1>
      {messageList.map((message: any, index: number) => (
        <p key={index}>
          {message.author}: {message.text}
        </p>
      ))}
      <input type="text" placeholder="Mensagem" ref={messageRef} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default Chat;
