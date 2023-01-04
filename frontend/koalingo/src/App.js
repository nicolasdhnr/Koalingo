import {
  Routes,
  Route,
  useNavigate,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import { getAuth } from "firebase/auth";

import Home from "./pages/home/Home";
import PlayerMemorizing from "./pages/player/PlayerMemorizing";
import SetTimer from "./pages/host/SetTimer";
import HostSetSelect from "./pages/host/HostSetSelect";
import PlayerQuizz from "./pages/player/PlayerQuizz";
import PlayerWelcome from "./pages/player/PlayerWelcome";
import HostProgressTracker from "./pages/host/HostProgressTracker";
import HostLobby from "./pages/host/HostLobby";
import Login from "./pages/home/Login";
// import Register from "./pages/home/Register";
import Waiting from "./pages/player/Waiting";
import Register from "./pages/home/Register-2";
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
  host : false,
  setHost : () => {},
  gamePin : "", 
  setGamePin :  () => {},
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

  // Create state to track game pin
  const [gamePin, setGamePin] = useState(0);

  

  return (
    <div >
    {user &&  <button onClick={logout}>Logout</button>}
    
    <AuthContext.Provider value={{auth, user, newWord, allWords,gamePin, setGamePin, setNewWord, setAllWords}}>
    <Routes>
      {/* <Route index element={<Login />} /> */}
      <Route index path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/player/welcome" element={<PlayerWelcome />} />
        
        <Route path="/host/set/timer" element={<SetTimer />} />
        <Route path="/host/set/select" element={<HostSetSelect />} />
        <Route path="/player/quizz" element={<PlayerQuizz />} />
        <Route path="/player/welcome" element={<PlayerWelcome />} />
        <Route path="/player/memorizing" element={< PlayerMemorizing/>} />
        <Route path="/host/progress-tracker" element={<HostProgressTracker />} />
        <Route path="/host/lobby" element={<HostLobby />} />
        <Route path="/home" element={<Home />} />
        <Route path="/web-1920-1" element={<Web19201 />} />
        <Route path="/waiting" element={<Waiting />} />
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
