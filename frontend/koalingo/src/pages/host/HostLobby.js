// Link to HostQuizz

import { Link } from "react-router-dom";

const HostQuizz = () => {
    return (
        <div>
        <h1>Host Quizz</h1>
        <Link to="/host/lobby" className="btn">
            To Host Lobby
        </Link>
        </div>
    );
    }
export default HostQuizz;

