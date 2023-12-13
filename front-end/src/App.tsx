import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3001");

const App = () => {

  useEffect(() => {
  }, [])

  const [messages, setMessages] = useState([
    { message: 'hello', id: "21564", user: { id: '35462', name: "Vlad" } },
    { message: 'hello world', id: "36562", user: { id: '83169', name: "Alex" } }
  ]);

  const [mes, setMes] = useState('hell!!')

  const sendMessage = () => {
  };

  return (
    <div className={styles.container}>
      {messages.map((m) => (
        <div key={m.id} className={styles.messageContainer}>
          <span className={styles.username}>{m.user.name}:</span> {m.message}
        </div>
      ))}
      <textarea className={styles.textarea} value={mes} onChange={(e) => setMes(e.currentTarget.value)}></textarea>
      <button className={styles.button} onClick={() => { 
        socket.emit('send-Message', mes) 
        setMes('')
        }}>
        Send
      </button>
    </div>
  );
};

export default App;
