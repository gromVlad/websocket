import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

export const Chat = () => {
  const { search } = useLocation(); //?name=xczxc&room=zxczczc
  const [params, setParams] = useState(null);
  const [socket, setSocket] = useState(null);

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
        console.log(data);
      });
    }
  }, [socket]);

  return <div></div>;
};
