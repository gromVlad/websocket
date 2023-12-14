import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import styles from "../styles/Chat.module.css";

export const Chat = () => {
  const { search } = useLocation(); //?name=xczxc&room=zxczczc
  const [params, setParams] = useState(null);
  const [socket, setSocket] = useState(null);
  const [state, setState] = useState([]);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));

    setParams(searchParams); //{name: 'vxvxvx', room: 'vxvxvxv'}
  }, [search]);

  useEffect(() => {
    if (params) {
      const socket = io.connect("http://localhost:5000");

      setSocket(socket);

      socket.emit("join", params);
    }
  }, [params]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setState((_state) => [..._state,data])
      });
    }
  }, [socket]);

  console.log(state);

  const handleLeftRoom = () => {

  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{params.room}</div>
        <div className={styles.users}> 0 users</div>
        <button className={styles.leftRoom} onClick={handleLeftRoom}></button>
      </div>
      <div className={styles.messages}>
        {state.map((mes) => {
          return <span>{mes}</span>;
        })}
      </div>
      <form className={styles.form}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            value={values[USERNAME]}
            className={styles.input}
            onChange={handleChange}
            autoComplete="off"
            placeholder="me"
            required
          />
        </div>
      </form>
    </div>
  );
};
