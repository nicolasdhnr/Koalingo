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
import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/player/memorizing" element={<Memorizing />} />
        <Route path="/player/lobby" element={<PlayerLobby />} />
        <Route path="/host/quizz" element={<HostQuizz />} />
        <Route path="/host/lobby" element={<HostLobby />} />
      </Routes>

  );
}

//TODO: Make it so that the user can only access the home page if they are logged in


export default App;
