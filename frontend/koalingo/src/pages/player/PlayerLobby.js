// From home page, user can join a game or create a new game 

import { Link } from "react-router-dom";

const PlayerLobby = () => {
    return (
        <div>
        <h1>Player Lobby</h1>
        <Link to="/player/quizz" className="btn">
            To Player Quizz
        </Link>
        </div>
    );
    }
export default PlayerLobby;
