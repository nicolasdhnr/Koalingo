// HostQuizz for now will just display a header and a button to go back to the home page

import { Link } from "react-router-dom";

const HostQuizz = () => {
    return (
        <div>
        <h1>Host Quizz</h1>
        <Link to="/" className="btn">
            To Home
        </Link>
        </div>
    );
    }
export default HostQuizz;
