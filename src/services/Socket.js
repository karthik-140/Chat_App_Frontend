import io from "socket.io-client";
import { url } from "../config/AppConfig";

// export const socket = io(url, {
//   transports: ["websocket"],
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   reconnectionDelay: 3000,
//   reconnectionDelayMax: 3000,
//   timeout: 5000,
// });

export const socket = io.connect(url);
