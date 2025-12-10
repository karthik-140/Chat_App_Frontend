import io from "socket.io-client";
import { url } from "../config/AppConfig";

export const socket = io(url, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 1000,
  timeout: 5000,
});
