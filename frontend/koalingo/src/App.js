import {
  Routes,
  Route,
  useNavigate,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
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
import Register from "./pages/Register";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Web19201 from "./pages/Web19201";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useCallback, createContext } from "react";
import {logout} from "./firebase";

import SetWordContext from "./development/SetWordContext";

//TODO: ADD Meta Tags


export const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
  newWord : null,
  setNewWord: () => {},
  allWords : null,
  setAllWords : () => {},
  gameID : null,
  setGameID : () => {},
  host : null,
  setHost : () => {}
});


function App() {
  const action = useNavigationType();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
    if (!user){
      navigate("/")
    }
  }, [action]);

  // Create states to track current word, and word set
  const [newWord, setNewWord] = useState({});
  const [allWords, setAllWords] = useState([]);

  

  return (
    <div >
    <h1> Koalingo </h1>
    {user &&  <button onClick={logout}>Logout</button>}
    
    <AuthContext.Provider value={{auth, user, newWord, allWords, setNewWord, setAllWords}}>
    <Routes>
      {/* <Route index element={<Login />} /> */}
      <Route index path="/" element={<Login />} />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/player/welcome" element={<PlayerWelcome />} />
        <Route path="/register" element={<Register />} />
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
      </Route>
      
      <Route path="/host/progress-tracker" element={<HostProgressTracker />} />
      <Route path="/host/lobby" element={<HostLobby />} />
      <Route path="/home" element={<Home />} />
      <Route path="/web-1920-1" element={<Web19201 />} />
      <Route path="/host/set/select_words" element={<SetWordContext />} /> 
      <Route path="*" element={<h1> Page not Found </h1>} />
    </Routes>
    </AuthContext.Provider>
    </div>
  );
}
export default App;
