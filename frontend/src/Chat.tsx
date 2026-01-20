import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// get local API
const socket: Socket = io(import.meta.env.VITE_API_URL);

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [pseudo, setPseudo] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on('loadHistory', (history) => {
        console.log("Historique reçu :", history);
        setMessages(history);
    });

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { sender: pseudo, content: message });
      setMessage('');
    }
  };

  // Sample styles
  const containerStyle = {
    position: 'fixed' as 'fixed',
    bottom: '20px',
    right: '20px', // Change par 'right' si tu changes d'avis !
    width: '320px',
    maxHeight: '450px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column' as 'column',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    zIndex: 1000,
    overflow: 'hidden'
  };

  const messageBoxStyle = {
    height: '300px',
    overflowY: 'auto' as 'auto',
    border: '1px solid #eee',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
  };

  if (!isJoined) {
    return (
      <div style={containerStyle}>
        <h3>Chat...</h3>
        <input
          style={{ width: '80%', padding: '10px', marginBottom: '10px' }}
          type="text"
          placeholder="Ton pseudo..."
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />
        <br />
        <button 
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
          onClick={() => pseudo && setIsJoined(true)}
        >
          Rejoindre le chat
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h4>Chat (Connecté : {pseudo})</h4>
      <div style={messageBoxStyle}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#2196F3' }}>{msg.sender}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex' }}>
        <input
          style={{ flex: 1, padding: '10px' }}
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '5px', cursor: 'pointer' }}>
          Envoyer
        </button>
      </form>
    </div>
  );
};