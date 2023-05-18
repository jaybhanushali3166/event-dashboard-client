import React, { useEffect } from "react";

const WebSocketComponent = () => {
  useEffect(() => {
    console.log("hello");
    const socket = new WebSocket("ws://localhost:3000/");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log("Received message:", message);
      // Process the received message
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return <></>; // Empty JSX fragment since this component doesn't render anything
};

export default WebSocketComponent;
