import React, { useState } from 'react';
import styles from './App.module.css';

const App = () => {
  const [messages, setMessages] = useState([
    { message: 'hello', id: "21564", user: { id: '35462', name: "Vlad" } },
    { message: 'hello world', id: "36562", user: { id: '83169', name: "Alex" } }
  ]);

  const sendMessage = () => {
    // Логика для отправки сообщения
  };

  return (
    <div className={styles.container}>
      {messages.map((m) => (
        <div key={m.id} className={styles.messageContainer}>
          <span className={styles.username}>{m.user.name}:</span> {m.message}
        </div>
      ))}
      <textarea className={styles.textarea}></textarea>
      <button className={styles.button} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default App;
