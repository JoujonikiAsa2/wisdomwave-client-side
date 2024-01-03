import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import Login from "../Pages/Login/Login"
import StudentSignUp from "../Pages/StudentSignUp/StudentSignUp"
import LandingPage from "../Pages/LandingPage/LandingPage"
import CourseDetails from "../Pages/Student/Components/CourseDetails"
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import Blogs from "../Pages/Blogs/Blogs"
import CreateBlogs from "../Pages/Blogs/CreateBlogs"
import Blog from "../Pages/Blogs/Blog"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                // student home route
                element: <LandingPage />
            },
            {
                path: "/courseDetails/:id",
                // student home route
                element: <PrivateRoute><CourseDetails /></PrivateRoute>
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/blogs/:id',
                element: <PrivateRoute><Blog /></PrivateRoute>
            },
            {
                path: '/createBlog',
                element: <PrivateRoute><CreateBlogs /></PrivateRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/studentSignUp",
        element: <StudentSignUp />
    }
])