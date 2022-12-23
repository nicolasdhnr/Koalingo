// Login page before home page

// Add basic structure with "Login header" and button link to home page

import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
        <h1>Login</h1>
        <Link to="/home" className="btn">
            To Home Page
        </Link>
        </div>
    );
    }

export default Login;

