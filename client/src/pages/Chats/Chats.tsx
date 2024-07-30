import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

const Chats = () => {
  const socket: Socket = useMemo(() => io("ws://localhost:5400"), []);
  const [message, setMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket.id", socket.id);
    });
    socket.on("recieve-message", (msg: string) => {
      console.log("msg", msg);
      setMessages((messages) => [...messages, msg]);
    });
  }, [socket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", { room, message });
    setMessage("");
  };
  const joinRoomHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("joined-room", roomName);
  };
  console.log("messages", messages);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to the Real time communication
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outline-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join Room
        </Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outline-basic"
          label="Message"
          variant="outlined"
        />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outline-basic"
          label="Socket ID"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack>
        {messages.map((eachMessage, index) => (
          <Typography variant="h6" component="div" key={index}>
            {eachMessage}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default Chats;
