import React, { useRef, useState, useEffect } from "react";
import SignUpPage from "../pages/SignUpPage";

// this code chunk will be useful when integrating websockets with FE

const { REACT_APP_WS_BASE_URL } = process.env;
const WEBSOCKET_API_URL = `${REACT_APP_WS_BASE_URL}notification/1/`;

const App = () => {
  const [schedule, setSchedule] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WEBSOCKET_API_URL);
    ws.current.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setSchedule(message ? message : []);
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  return (
    <div>
      <SignUpPage />
    </div>
  );
};

export default App;
