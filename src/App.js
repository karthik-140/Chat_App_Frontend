import { Route, Routes } from 'react-router-dom';

import Landing from "./pages/Landing";
import Chat from './pages/Chat';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/chats' element={<Chat />} />
    </Routes>
  );
}

export default App;
