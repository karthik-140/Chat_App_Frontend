import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getToken } from "./config/AppConfig";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!!token) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chats" element={<Chat />} />
    </Routes>
  );
}

export default App;
