import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

import icon from "../images/emoji.svg";
import styles from "../styles/Chat.module.css";
import Messages from "./Messages";

const socket = io.connect("https://websocket-yo8x.onrender.com/");

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: "", user: "" });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
      console.log(users);
      setRoomUsers((_state) => {
        const uniqueUsers = [...new Set(users.map((el) => el.name))];
        return [...uniqueUsers];
      });
    });
  }, [roomUsers]);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  const onEmojiClick = ({ emoji }) => {
    setMessage(`${message} ${emoji}`)
    setOpen(!isOpen);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.userList}>
        <h2>Users in the room {users}:</h2>
        <ul className={styles.userListContainer}>
          {roomUsers.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>

      <div className={styles.chatWrapper}>
        <div className={styles.header}>
          <div className={styles.title}>{params.room}</div>
          <button className={styles.left} onClick={leftRoom}>
            leave chat
          </button>
        </div>

        <div className={styles.messages}>
          <Messages messages={state} name={params.name} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input}>
            <input
              type="text"
              name="message"
              placeholder="message..."
              value={message}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.emoji}>
            <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

            {isOpen && (
              <div className={styles.emojies}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <div className={styles.button}>
            <input
              type="submit"
              onSubmit={handleSubmit}
              value="Send a message"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
