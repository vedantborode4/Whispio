import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import { verifyToken } from '@clerk/backend';
import url from 'url';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());

wss.on('connection', async (ws: WebSocket, req) => {
  const parsedUrl = url.parse(req.url || '', true);
  const token = parsedUrl.query.token as string;

  if (!token) {
    ws.close(1008, 'Missing token');
    return;
  }

  try {
    const { userId, sessionId } = await verifyToken(token);
    console.log(`Client connected: userId=${userId}, sessionId=${sessionId}`);

    ws.on('message', (message) => {
      console.log('Received:', message.toString());
      ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
      console.log(`Client disconnected: userId=${userId}`);
    });
  } catch (err) {
    console.error('Token verification failed:', err);
    ws.close(1008, 'Invalid token');
  }
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
