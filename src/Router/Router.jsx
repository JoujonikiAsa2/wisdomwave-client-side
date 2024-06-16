import {
    createBrowserRouter,
} from "react-router-dom"
import Root from "../Layout/Root"
import Login from "../Pages/Login/Login"
import StudentSignUp from "../Pages/StudentSignUp/StudentSignUp"
import CourseDetails from "../Pages/Student/Components/CourseDetails"
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
import TutorDashboard from "../Pages/TutorDashboard/TutorDashboard"
import LandingPage from "../Pages/LandingPage/LandingPage"
import AdminLayout from "../Layout/AdminLayout"
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard"
import CreateCourse from "../Pages/InstructorDashboard/CreateCourse"
import ManageCourse from "../Pages/InstructorDashboard/ManageCourse"
import UpdateCourse from "../Pages/InstructorDashboard/UpdateCourse"
import ManageClasses from "../Pages/InstructorDashboard/ManageClasses"
import StudentInformation from "../Pages/InstructorDashboard/StudentInformation"
import Announcement from "../Pages/InstructorDashboard/Announcement"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import InstructorRoute from "./InstructorRoute/InstructorRoute"
import TutorRoute from "./TutorRoute/TutorRoute"
import Assignments from "../Pages/InstructorDashboard/Assignments"
import CreateQuiz from "../Pages/InstructorDashboard/Components/CreateQuiz"
import TakeQuiz from "../Pages/Student/Components/TakeQuiz"
import ViewQuiz from "../Pages/Student/Components/ViewQuiz"
import Tuitions from "../Pages/TutorDashboard/Tuitions"
import TuitionRequest from "../Pages/TutorDashboard/TuitionRequest"
import CreateProfile from "../Pages/TutorDashboard/CreateProfile"
import ManageProfile from "../Pages/TutorDashboard/ManageProfile"
import UpdateProfile from "../Pages/TutorDashboard/UpdateProfile"
import SendingRequests from "../Pages/TutorDashboard/SendingRequests"
import TutorLayout from "../Layout/TutorLayout"
import HomeRoute from "./HomeRoute/HomeRoute"
import PaymentDashboard from "../Pages/AdminDashboard/PaymentDashboard"
import ManageCourses from "../Pages/AdminDashboard/ManageCourses"
import ManageUsers from "../Pages/AdminDashboard/ManageUsers"
import ManageTutorProfiles from "../Pages/AdminDashboard/ManageTutorProfiles"
import ManageTuitions from "../Pages/AdminDashboard/ManageTuitions"
import UpdateCourseAdmin from "../Pages/AdminDashboard/UpdateCourseAdmin"
import ManageCertification from "../Pages/InstructorDashboard/ManageCertification"
import GetCertificate from "../Pages/Student/Components/GetCertificate"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeRoute><Root /></HomeRoute>,
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
                path: '/requestedTuitions',
                element: <PrivateRoute><RequestedTuition></RequestedTuition></PrivateRoute>
            },
            {
                path: '/createTuition',
                element: <PrivateRoute><CreateTuition></CreateTuition></PrivateRoute>
            },
            {
                path: "/viewQuiz/:id/:title",
                element: <ViewQuiz></ViewQuiz>
            },
            {
                path: "/takeQuiz/:id/:title",
                element: <TakeQuiz />,
            },
            {
                path: '/courseDashboard/:id/:playlistId/:title',
                element: <PrivateRoute><CourseDashboard></CourseDashboard></PrivateRoute>
            },
            {
                path: '/getCertificate/:id/:title/:instructor/:duration', 
                element: <GetCertificate/>
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
        element: <InstructorRoute><InstructorLayout></InstructorLayout></InstructorRoute>,
        children:[
            {
                path: "instructorDashboard",
                element: <InstructorRoute><InstructorDashboard /></InstructorRoute>
            },
            {
                path: "createCourse",
                element: <InstructorRoute><CreateCourse /></InstructorRoute>
            },
            {
                path: "manageCourses",
                element: <InstructorRoute><ManageCourse /></InstructorRoute>
            },
            {
                path: "updateCourse/:id",
                element: <InstructorRoute><UpdateCourse /></InstructorRoute>
            },
            {
                path: "announcements",
                element: <InstructorRoute><Announcement /></InstructorRoute>
            },
            {
                path: "assignments",
                element: <InstructorRoute><Assignments /></InstructorRoute>
            },
            {
                path: "manageClasses",
                element: <InstructorRoute><ManageClasses /></InstructorRoute>
            },
            {
                path: "studentInfo",
                element: <InstructorRoute><StudentInformation /></InstructorRoute>
            },
            {
                path: "createAssignments/:id",
                element: <CreateQuiz />
            },
            {
                path: 'courseDashboard/:id/:playlistId',
                element: <CourseDashboard></CourseDashboard>,
            },
            {
                path: 'manageCertification',
                element: <ManageCertification/>
            }
            
        ]
    },
    {
        path: 'tutor',
        element: <TutorRoute><TutorLayout></TutorLayout></TutorRoute>,
        children:[
            {
                path: "tutorDashboard",
                element: <TutorRoute><TutorDashboard /></TutorRoute>
            },
            {
                path: 'tuitions',
                element: <Tuitions></Tuitions>
            },
            {
                path: 'tuitionRequest',
                element: <TuitionRequest></TuitionRequest>
            },
            {
                path: 'sendingRequests',
                element: <SendingRequests></SendingRequests>
            },
            {
                path: 'createProfile',
                element: <CreateProfile></CreateProfile>
            },
            {
                path: 'manageProfile/:email',
                element: <ManageProfile></ManageProfile>
            },
            {
                path: 'edit-profile/:email',
                element: <UpdateProfile></UpdateProfile>
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
            {
                path: "paymentDashboard",
                element: <PaymentDashboard />
            },
            {
                path: "manageCourses",
                element: <ManageCourses />
            },
            {
                path: "manageUsers",
                element: <ManageUsers />
            },
            {
                path: "manageTutorProfiles",
                element: <ManageTutorProfiles />
            },
            {
                path: "manageTuitions",
                element: <ManageTuitions />
            },
            {
                path: "updateCourse/:id",
                element: <UpdateCourse></UpdateCourse>
            },
            {
                path: 'manageProfile/:email',
                element: <ManageProfile></ManageProfile>
            },
            {
                path: 'edit-profile/:email',
                element: <UpdateProfile></UpdateProfile>
            },
        ]
    }
])