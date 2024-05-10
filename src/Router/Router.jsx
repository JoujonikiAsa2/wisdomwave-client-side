import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import Login from "../Pages/Login/Login"
import StudentSignUp from "../Pages/StudentSignUp/StudentSignUp"
import CourseDetails from "../Pages/Student/Components/CourseDetails"
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import AvailableCourses from "../Pages/Student/Components/AvailableCourses"
import SearchPage from "../SharedComponents/Header/SearchPage"
import Discussions from "../Pages/Discussions/Discussions"
import DiscussionDetails from "../Pages/Discussions/DiscussionDetails"
import CreateDiscussion from "../Pages/Discussions/CreateDiscussion"
import ForgetPassword from "../Components/ForgetPassword/ForgetPassword"
import SecondaryRoot from "../Layout/SecondaryRoot"
import PaymentSuccess from "../Pages/Payment/PaymentSuccess"
import PaymentCancel from "../Pages/Payment/PaymentCancel"
import PaymentFail from "../Pages/Payment/PaymentFail"
import CourseDashboard from "../Pages/Student/Components/CourseDashboard"
import AllCourses from "../Pages/AllCourses/AllCourses"
import FindTutors from "../Pages/FindTutors/FindTutors"
import CreateTuition from "../Pages/Student/CreateTuition"
import TutorDetails from "../Pages/FindTutors/TutorDetails"
import RequestedTuition from "../Pages/FindTutors/RequestedTuition"
import PageNotFound from "../SharedComponents/404_page/PageNotFound"
import TutorSignup from "../Pages/TutorSignup/TutorSignup"
import InstructorSignup from "../Pages/InstructorSignup/InstructorSignup"
import InstructorLayout from "../Layout/InstructorLayout"
import InstructorDashboard from "../Pages/InstructorDashboard/InstructorDashboard"
import TutorLayout from "../Layout/tutorLayout"
import TutorDashboard from "../Pages/TutorDashboard/TutorDashboard"
import LandingPage from "../Pages/LandingPage/LandingPage"
import AdminLayout from "../Layout/AdminLayout"
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard"
import CreateCourse from "../Pages/InstructorDashboard/CreateCourse"
import ManageCourse from "../Pages/InstructorDashboard/ManageCourse"
import UpdateCourse from "../Pages/InstructorDashboard/UpdateCourse"
import Quiz from "../Pages/InstructorDashboard/Quiz"
import ManageClasses from "../Pages/InstructorDashboard/ManageClasses"
import PaymentDashboard from "../Pages/InstructorDashboard/PaymentDashboard"
import StudentInformation from "../Pages/InstructorDashboard/StudentInformation"
import Announcement from "../Pages/InstructorDashboard/Announcement"
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
                path: '/myCourses',
                element: <PrivateRoute><AvailableCourses></AvailableCourses></PrivateRoute>
            },
            ,
            {
                path: '/allCourses',
                element: <AllCourses></AllCourses>
            },
            {
                path: '/findTutors',
                element: <FindTutors></FindTutors>
            },
            {
                path: '/tutorDetails/:id',
                element: <PrivateRoute><TutorDetails></TutorDetails></PrivateRoute>
            },
            {
                path: '/requestedTuition',
                element: <RequestedTuition></RequestedTuition>
            },
            {
                path: '/createTuition',
                element: <CreateTuition></CreateTuition>
            },
            {
                path: '/courseDashboard/:playlistId',
                element: <PrivateRoute><CourseDashboard></CourseDashboard></PrivateRoute>
            },
            
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
            // student
            {
                path: "/studentSignUp",
                element: <StudentSignUp />
            },
            // instructor
            {
                path: '/instructorSignup',
                element: <InstructorSignup></InstructorSignup>
            },
            // tutor
            {
                path: '/tutorSignup',
                element: <TutorSignup></TutorSignup>
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
    },
    {
        path: 'instructor',
        element: <InstructorLayout></InstructorLayout>,
        children:[
            {
                path: "instructorDashboard",
                element: <InstructorDashboard />
            },
            {
                path: "createCourse",
                element: <CreateCourse />
            },
            {
                path: "manageCourses",
                element: <ManageCourse />
            },
            {
                path: "updateCourse/:id",
                element: <UpdateCourse />
            },
            {
                path: "announcements",
                element: <Announcement />
            },
            {
                path: "quiz",
                element: <Quiz />
            },
            {
                path: "manageClasses",
                element: <ManageClasses />
            },
            {
                path: "paymentDashboard",
                element: <PaymentDashboard/>
            },
            {
                path: "studentInfo",
                element: <StudentInformation />
            },
        ]
    },
    {
        path: 'tutor',
        element: <TutorLayout></TutorLayout>,
        children:[
            {
                path: "tutorDashboard",
                element: <TutorDashboard />
            },
        ]
    }
    ,
    {
        path: 'admin',
        element: <AdminLayout></AdminLayout>,
        children:[
            {
                path: "adminDashboard",
                element: <AdminDashboard />
            },
            
        ]
    }
])