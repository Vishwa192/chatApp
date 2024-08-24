import React, { useState } from 'react';
import Login from './Components/Login/Login';
import Chatroom from './Components/Chatroom/Chatroom';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
   const [name,setName] = useState("");
   return <Router>
    <Routes>
      <Route path="/" element={<Login onLogin={setName}/>} />
      <Route path="/chatroom" element={<Chatroom name={name}/>} />
    </Routes>
   </Router>
}

export default App;
