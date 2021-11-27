import React, { useState } from 'react'
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat'

// const socket = io.connect('http://localhost:3001');
const socket = io.connect('https://chawput-chat-react-socketio.herokuapp.com/');


function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username && room) {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  }

	return (
		<div className='App'>
      {!showChat ? (
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          type='text'
          placeholder='Enter your name'
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter Room ID'
          onChange={e => setRoom(e.target.value)}
        />
        <button className='btn btn-primary' onClick={joinRoom}>Join</button>
      </div>
      ) : (
        <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
	);
}

export default App;
