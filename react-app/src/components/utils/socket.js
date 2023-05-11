// socket.js
// creating a socket instance using the socket.io-client library and specifying the URL 'http://localhost:3000' for the WebSocket connection
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default socket;
