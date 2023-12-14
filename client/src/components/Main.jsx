import { useState } from "react";
import styles from "../styles/Main.module.css";
import { Link } from "react-router-dom";

const FIELDS = {
  USERNAME: "username",
  ROOM: "room",
};

export const Main = () => {
  const { USERNAME, ROOM } = FIELDS;

  const [values, setvalues] = useState({
    [USERNAME]: "",
    [ROOM]: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setvalues({ ...values, [name]: value });
  }
    const handleClick = (e) => {
      const isDisabled = Object.values(values).some((value) => !value);
      if (isDisabled) {
        e.preventDefault();
      }
    };

    return (
      <>
        <dev className={styles.wrap}></dev>
        <div className={styles.container}>
          <h1 className={styles.heading}>Join</h1>
          <form className={styles.form}>
            <div className={styles.group}>
              <input
                type="text"
                name="username"
                value={values[USERNAME]}
                className={styles.input}
                onChange={handleChange}
                autoComplete="off"
                placeholder="username"
                required
              />
            </div>
            <div className={styles.group}>
              <input
                type="text"
                name="room"
                value={values[ROOM]}
                className={styles.input}
                autoComplete="off"
                placeholder="room"
                required
                onChange={handleChange}
              />
            </div>
            <Link
              to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`}
              onClick={handleClick}
            >
              <button type="submit" className={styles.button}>
                Sign in
              </button>
            </Link>
          </form>
        </div>
      </>
    );
};
