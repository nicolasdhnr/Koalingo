// Links back to home page 
import { Link } from "react-router-dom";

const PlayerQuizz = () => {
    return (
        <div>
        <h1>Player Quizz</h1>
        <Link to="/" className="btn">
            To Home
        </Link>
        </div>
    );
    }
export default PlayerQuizz;
