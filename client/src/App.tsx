import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Player {
  id: string;
  name: string;
}

function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    
    socket.on('connect', () => {
      console.log('✅ CONNECTED !');
    });
    
    // ÉCOUTER les mises à jour du serveur
    socket.on('playersUpdate', (data: { players: Player[], count: number }) => {
      console.log('📊 Players:', data.players);
      setPlayers(data.players);
    });

    return () => socket.close();
  }, []);

  return (
    <div style={{ 
      padding: '2rem', fontFamily: 'monospace', 
      textAlign: 'center', background: '#1a1a1a', 
      color: '#00ff88', minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '3rem' }}>🧨 Red Tetris</h1>
      
      <div style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        👥 <strong>{players.length}</strong> joueur(s)
      </div>
      
      <div style={{ 
        maxWidth: '400px', margin: '0 auto',
        background: '#2a2a2a', padding: '1rem', 
        borderRadius: '8px', textAlign: 'left'
      }}>
        {players.map(player => (
          <div key={player.id} style={{ 
            padding: '0.5rem', 
            borderBottom: '1px solid #444',
            fontSize: '1.1rem'
          }}>
            👤 {player.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
