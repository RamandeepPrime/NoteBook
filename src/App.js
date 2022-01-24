import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Note/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from "./components/Alert"


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <NoteState>
      <Router>
        <div>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert}/>} />
            <Route path='/about' element={<About showAlert={showAlert}/>} />
            <Route path='/login' element={<Login showAlert={showAlert}/>} />
            <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
