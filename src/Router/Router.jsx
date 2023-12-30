import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import LandingPage from "../Pages/LandingPage/Components/LandingPage"
import Login from "../Pages/Login/Login"
import StudentSignUp from "../Pages/StudentSignUp/StudentSignUp"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                // student home route
                element: <LandingPage></LandingPage>
            }
        ]
    },
    {
        path:"/login",
        element: <Login></Login>
    },
    {
        path:"/studentSignUp",
        element: <StudentSignUp></StudentSignUp>
    }
])