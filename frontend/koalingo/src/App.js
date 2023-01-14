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
import HostProgressTracker from "./pages/host/HostProgressTracker";
import HostLobby from "./pages/host/HostLobby";
import Login from "./pages/home/Login";
import EmailLogin from "./pages/home/EmailLogin";
import Waiting from "./pages/player/Waiting";
import Register from "./pages/home/Register";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Web19201 from "./pages/Web19201";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useCallback, createContext } from "react";
import {logout} from "./firebase";
import AvailableWords from "./pages/host/AvailableWords";
import SetWordContext from "./development/SetWordContext";
import { PlayerCustomise } from "./pages/home/PlayerCustomise";
import {StateResult} from "./pages/player/StateResult";
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
  seconds : 0,
  setSeconds : () => {},
  minutes : 0,
  setMinutes : () => {},
  globNickname : "", 
  setGlobNickname : () => {}
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
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  // Create state to track user preferences
  const [globNickname, setGlobNickname] = useState("");
  const [character, setCharacter] = useState("girl");

  return (
    <div >
    <AuthContext.Provider value={{auth, user, newWord, allWords,gamePin, minutes, seconds, globNickname,character, setGamePin, setNewWord, setAllWords, setMinutes, setSeconds, setGlobNickname, setCharacter}}>
    <Routes>
      {/* <Route index element={<Login />} /> */}
      <Route index path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<EmailLogin />} />
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/host/set/timer" element={<SetTimer />} />
        <Route path="/host/set/select" element={<HostSetSelect />} />
        <Route path="/player/quizz" element={<PlayerQuizz />} />
        <Route path="/player/memorizing" element={< PlayerMemorizing/>} />
        <Route path="/host/progress-tracker" element={<HostProgressTracker />} />
        <Route path="/host/lobby" element={<HostLobby />} />
        <Route path="/home" element={<Home />} />
        <Route path="/web-1920-1" element={<Web19201 />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/host/available-words" element={<AvailableWords />} />
       <Route path="/host/set/select_words" element={<SetWordContext />} /> 
       <Route path="/player/customise" element={<PlayerCustomise />} /> 
        <Route path="/player/result" element={<StateResult />} />
      </Route>

      <Route path="/host/lobby" element={<HostLobby />} />
      <Route path="/home" element={<Home />} />
      <Route path="/web-1920-1" element={<Web19201 />} />


      <Route path="*" element={<h1> Page not Found </h1>} />

    </Routes>
    </AuthContext.Provider>
    </div>
  );
}
export default App;
