import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import StudentHome from "../Pages/StudentHome/Components/StudentHome"
import Login from "../Pages/Login/Login"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                // student home route
                element: <StudentHome></StudentHome>
            }
        ]
    },
    {
        path:"/login",
        element: <Login></Login>
    }
])