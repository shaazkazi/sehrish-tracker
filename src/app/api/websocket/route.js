// app/api/websocket/route.js
import WebSocket from 'ws';

export async function GET() {
  const wsServer = new WebSocket.Server({ noServer: true });

  // Handle WebSocket connection
  wsServer.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the client
    ws.send(JSON.stringify({ message: 'Welcome to the WebSocket server!' }));

    // Listen for incoming messages from the client
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      // Echo the message back to the client
      ws.send(`Echo: ${message}`);
    });

    // Handle WebSocket close event
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  // Return the WebSocket server
  return new Response('WebSocket server is up and running', { status: 200 });
}
