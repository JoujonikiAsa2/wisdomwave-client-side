import {
    createBrowserRouter,
} from "react-router-dom"
import Home from "../Pages/Home/Components/Home"
import Root from "../Layout/Root"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [

            {
                path: "/",
                element: <Home></Home>
            }
        ]
    }
])