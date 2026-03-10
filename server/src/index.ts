import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io: Server = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" }
});

app.use(cors());
app.use(express.static('../client/dist'));

io.on('connection', (socket: Socket) => {
  console.log('✅ Player connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('❌ Player disconnected:', socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
