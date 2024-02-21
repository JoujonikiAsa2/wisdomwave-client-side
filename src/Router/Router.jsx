import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import Login from "../Pages/Login/Login"
import StudentSignUp from "../Pages/StudentSignUp/StudentSignUp"
import LandingPage from "../Pages/LandingPage/LandingPage"
import CourseDetails from "../Pages/Student/Components/CourseDetails"
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import AvailableCourses from "../Pages/Student/Components/AvailableCourses"
import Payment from "../Pages/Payment/Payment"
import SearchPage from "../SharedComponents/Header/SearchPage"
import PageNotFound from "../Pages/404_page/PageNotFound"
import { AllCourses } from "../Pages/LandingPage/Components/AllCourses"
import Discussions from "../Pages/Discussions/Discussions"
import DiscussionDetails from "../Pages/Discussions/DiscussionDetails"
import CreateDiscussion from "../Pages/Discussions/CreateDiscussion"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <PageNotFound/>,
        children: [
            {
                path: "/",
                // student home route
                element: <LandingPage />
            },
            {
                path: "/courseDetails/:id",
                // student home route
                element: <CourseDetails />
            },
            {
                path: '/discussions',
                element: <Discussions/>
            },
            {
                path: '/searchPage',
                element: <SearchPage />
            },
            {
                path: '/discussions/:id',
                element: <PrivateRoute><DiscussionDetails/></PrivateRoute>,
                // loader: () => fetch('http://localhost:5000/api/blogs')
            },
            {
                path: '/createDiscussion',
                element: <PrivateRoute><CreateDiscussion /></PrivateRoute>
            }
            ,
            {
                path: '/myCourse',
                element: <PrivateRoute><AvailableCourses /></PrivateRoute>
            },
            {
                path: '/payment',
                element: <PrivateRoute><Payment/></PrivateRoute>
            },
            {
                path: '/allCourses',
                element: <AllCourses></AllCourses>

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