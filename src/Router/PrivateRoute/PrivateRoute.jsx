
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../../SharedComponents/Loader/Loader";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
const PrivateRoute = ({ children }) => {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false)
        }

    }, [user])

    if (user !== null) {
        return children
    }

    else if (isLoading == true) {
        return <Loader></Loader>
    }

    return (
        <div>
            <Navigate to='/login' state={location.pathname}></Navigate>
        </div>
    );
};

export default PrivateRoute;