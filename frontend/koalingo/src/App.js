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

import Web19201 from "./pages/Web19201";
import { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useCallback, createContext } from "react";

import {logout} from "./firebase";


const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
    if (!user){
      navigate("/")
    }
  }, [action]);

  // Logout Button conditionally renders if user is not logged in
  

  const onLogoutButtonClick = useCallback(async () => {
    useContext(AuthContext);
    await signOut(auth);
    console.log(user)
  }, [auth]);




  

  //TODO: ADD Meta Tags

  return (
    <div >
    <h1> Koalingo </h1>
    {user &&  <button onClick={logout}>Logout</button>}
    
    <AuthContext.Provider value={{auth, user }}>
    <Routes>
     

      <Route path="/" element={<Login />} />

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

      <Route path="*" element={<h1> Page not Found </h1>} />
    </Routes>
    </AuthContext.Provider>
    </div>
  );
}
export default App;
