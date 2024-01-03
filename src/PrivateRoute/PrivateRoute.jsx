
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({children}) => {
    const {user,isLoading} = useAuth()
    const location = useLocation()

    if(user){
        return children
    }

    if(isLoading){
        return <p>Loading...</p>
    }
    
    return (
        <div>
            <Navigate to='/login' state={location.pathname}></Navigate>
        </div>
    );
};

export default PrivateRoute;