import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/Forgot";
import Error from "../pages/Error";

const router = createBrowserRouter(
    [
        {
            path:"/",
            element: <HomeLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
            ]
        },
        {
            path:"/auth",
            element:<AuthLayout></AuthLayout>,
            children: [
                {
                    path:"/auth/login",
                    element:<Login></Login>,
                },
                {
                    path:"/auth/registration",
                    element:<Register></Register>,
                }
            ]
        },
        {
            path:"/forgot",
            element:<ForgotPassword></ForgotPassword>,
        },
        {
            path:"/*",
            element:<Error></Error>
        }
    ]
);

export default router;