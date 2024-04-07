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
import SearchPage from "../SharedComponents/Header/SearchPage"
import PageNotFound from "../Pages/404_page/PageNotFound"
import { AllCourses } from "../Pages/LandingPage/Components/AllCourses"
import Discussions from "../Pages/Discussions/Discussions"
import DiscussionDetails from "../Pages/Discussions/DiscussionDetails"
import CreateDiscussion from "../Pages/Discussions/CreateDiscussion"
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword"
import SecondaryRoot from "../Layout/SecondaryRoot"
import PaymentSuccess from "../Pages/Payment/PaymentSuccess"
import PaymentCancel from "../Pages/Payment/PaymentCancel"
import PaymentFail from "../Pages/Payment/PaymentFail"
import CourseDashboard from "../Pages/Student/Components/CourseDashboard"

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
                path: '/allCourses',
                element: <AllCourses></AllCourses>

            },
            {
                path: '/myCourses',
                element: <PrivateRoute><AvailableCourses></AvailableCourses></PrivateRoute>
            },
            {
                path: '/courseDashboard/:playlistId',
                element: <PrivateRoute><CourseDashboard></CourseDashboard></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        element: <SecondaryRoot></SecondaryRoot>,
        children:[
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/forgetPassword",
                element: <ForgetPassword />
            },
            {
                path: "/studentSignUp",
                element: <StudentSignUp />
            },
            {
                path: '/payment/success/:course_Id',
                element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>

            },
            {
                path: '/payment/cancel/:course_Id',
                element: <PrivateRoute><PaymentCancel></PaymentCancel></PrivateRoute>

            },
            {
                path: '/payment/fail/:courseId',
                element: <PrivateRoute><PaymentFail></PaymentFail></PrivateRoute>

            }
        ]
    }
])