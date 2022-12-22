import logo from './logo.svg';
import './App.css';
// Router relate stuff
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Import components
import Home from './pages/Home';
import Login  from './pages/Login';
import Memorizing from './pages/player/Memorizing';
import PlayerLobby from './pages/player/PlayerLobby';
import PlayerQuizz from './pages/player/PlayerQuizz';
import HostQuizz from './pages/host/HostQuizz';
import HostLobby from './pages/host/HostLobby';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/memorizing" element={<Memorizing />} />
        <Route path="/player/lobby" element={<PlayerLobby />} />
        <Route path="/player/quizz" element={<PlayerQuizz />} />
        <Route path="/host/quizz" element={<HostQuizz />} />
        <Route path="/host/lobby" element={<HostLobby />} />
      </Routes>
    </Router>

  );
}

export default App;
