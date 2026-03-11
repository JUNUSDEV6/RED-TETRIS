import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import type { Player } from '../../shared/types';

const app = express();
const httpServer = createServer(app);
const io: Server = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" }
});

app.use(cors());
app.use(express.static('../client/dist'));

const players: Record<string, Player> = {};
const rooms: Record<string, {
	name: string;
	players: Record<string, Player>;
	hostId: string;
	started: boolean
}> = {};

io.on('connection', (socket: Socket) => {
  console.log('✅ Player connected:', socket.id);
  
  // ✅ CREATE PLAYER
  players[socket.id] = {
    id: socket.id,
    name: `Player_${Math.floor(Math.random() * 1000)}`,
    board: Array.from({ length: 20 }, () => Array(10).fill(0)),
    spectrum: Array(10).fill(0)
  };

  // SEND INIT DATA TO NEW PLAYER
  socket.emit('init', {
		rooms: Object.keys(rooms),
		players: Object.values(players)
  });
  
  // ✅ NOTIFIER ALL CLIENTS
  io.emit('playersUpdate', { 
    players: Object.values(players),
    count: Object.keys(players).length 
  });
  
  socket.on('createRoom', (roomName: string) => {
	if (!rooms[roomName]) {
		rooms[roomName] = {
			name : roomName,
			players: { [socket.id]: players[socket.id] },
			hostId: socket.id,
			started : false
		};
		socket.join(roomName);
		io.emit('roomsupdate', Object.keys(rooms));
		console.log(`🏠 Room "${roomName}" created by ${players[socket.id].name}`);
	}
  });

  socket.on('joinRoom', (roomName: string) => {
	if (rooms[roomName]){
		rooms[roomName].players[socket.id] = players[socket.id];
		socket.join(roomName);

		//notif room
		io.to(roomName).emit('roomUpdate', {
			room: roomName,
			players: Object.values(rooms[roomName].players)
		});
		io.emit('roomsUpdate', Object.keys(rooms));
		console.log(`➕ ${players[socket.id].name} joined "${roomName}"`);
	}
  });

  
  console.log('👤 Players count:', Object.keys(players).length);
  
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('playersUpdate', { 
      players: Object.values(players),
      count: Object.keys(players).length 
    });
    console.log('❌ Player disconnected:', socket.id);
    console.log('👤 Players count:', Object.keys(players).length);
  });
});



const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
