import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import Login from "../Pages/Login/Login"
import StudentSignUp from "../Pages/StudentSignUp/StudentSignUp"
import LandingPage from "../Pages/LandingPage/LandingPage"
import CourseDetails from "../Pages/Student/Components/CourseDetails"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                // student home route
                element: <LandingPage></LandingPage>
            },
            {
                path: "/courseDetails/:id",
                // student home route
                element: <CourseDetails></CourseDetails>
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