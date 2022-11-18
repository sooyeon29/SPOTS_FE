import io from "socket.io-client";

export default io.connect("https://developerjuri.shop", {
  cors: {
    origin: "http://localhost:3000",
  },
  transports: ["websocket", "polling"],
});
