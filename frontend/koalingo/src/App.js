import logo from './logo.svg';
import './App.css';
// Router relate stuff
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Import components
import Home from './pages/Home';
import Login  from './pages/Login';
import Memorizing from './pages/player/Memorizing';
import HostQuizz from './pages/host/HostQuizz';
import PlayerLobby from './pages/player/PlayerLobby';
import HostLobby from './pages/host/HostLobby';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/memorizing" element={<Memorizing />} />
        <Route path="/player/lobby" element={<PlayerLobby />} />
        <Route path="/host/quizz" element={<HostQuizz />} />
        <Route path="/host/lobby" element={<HostLobby />} />
      </Routes>
    </Router>

  );
}

export default App;
