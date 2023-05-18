import "./App.css";
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
function App() {
  const data = [
    {
      Tag1: "Tag1Value1",
      Tag2: "Tag2Value1",
      Tag3: "Tag3Value1",
      Metric1: 10.5,
      Metric2: 20.5,
    },
    {
      Tag1: "Tag1Value2",
      Tag2: "Tag2Value2",
      Tag3: "Tag3Value2",
      Metric1: 15.2,
      Metric2: 25.7,
    },
    {
      Tag1: "Tag1Value3",
      Tag2: "Tag2Value3",
      Tag3: "Tag3Value3",
      Metric1: 8.3,
      Metric2: 18.6,
    },
    {
      Tag1: "Tag1Value4",
      Tag2: "Tag2Value4",
      Tag3: "Tag3Value4",
      Metric1: 12.1,
      Metric2: 22.9,
    },
    {
      Tag1: "Tag1Value5",
      Tag2: "Tag2Value5",
      Tag3: "Tag3Value5",
      Metric1: 9.7,
      Metric2: 19.8,
    },
    // ... more data items ...
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message = event.data;
      // console.log("Received message:", message);
      const data = JSON.parse(message);
      setTableData((prevData) => [...prevData, data]); // Append the received data to the existing table data
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <DataTable data={tableData} />
      {/* <WebSocketComponent /> */}
    </>
  );
}

export default App;
