import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import PlayerMemorizing from "./pages/PlayerMemorizing";
import SetTimer from "./pages/SetTimer";
import PlayerLobby from "./pages/PlayerLobby";
import HostSetSelect from "./pages/HostSetSelect";
import PlayerQuizz from "./pages/PlayerQuizz";
import PlayerWelcome from "./pages/PlayerWelcome";
import HostProgressTracker from "./pages/HostProgressTracker";
import HostLobby from "./pages/HostLobby";
import Login from "./pages/Login";


import Web19201 from "./pages/Web19201";
import { useEffect } from "react";



function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  //TODO: ADD Meta Tags

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/player/welcome" element={<PlayerWelcome />} />

      <Route path="/host/set/timer" element={<SetTimer />} />

      <Route path="/player/lobby" element={<PlayerLobby />} />

      <Route path="/host/set/select" element={<HostSetSelect />} />

      <Route path="/player/quizz" element={<PlayerQuizz />} />

      <Route path="/player/welcome" element={<PlayerWelcome />} />

        <Route path="/player/memorizing" element={< PlayerMemorizing/>} />

      <Route path="/host/progress-tracker" element={<HostProgressTracker />} />

      <Route path="/host/lobby" element={<HostLobby />} />

      <Route path="/home" element={<Home />} />

      <Route path="/web-1920-1" element={<Web19201 />} />
    </Routes>
  );
}
export default App;
