import io from "socket.io-client";

export default io.connect(process.env.REACT_APP_SOCKET, {
  path: "/socket.io",
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["websocket", "polling"],
});
