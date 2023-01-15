// Routes when user is authenticated
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ user, redirectPath="/", children }) => {
    if (!user) {
      return <Navigate to="/"/>;
    }
    return children ? children : <Outlet/>;
    }