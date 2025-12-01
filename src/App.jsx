import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [status, setStatus] = useState("...");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus("API error"));
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-4xl text-cyan-400 font-bold">
        API STATUS → {status}
      </h1>
    </div>
  );
}
