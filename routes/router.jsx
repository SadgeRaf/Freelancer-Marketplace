import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/Forgot";
import Error from "../pages/Error";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import PrivateRoute from '../provider/PrivateRoute';
import JobDetail from "../pages/JobDetail";
import UpdateJob from "../pages/updateJob";


const router = createBrowserRouter(
    [
        {
            path:"/",
            element: <HomeLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                    loader: () => fetch('http://localhost:3000/latestJobs')
                },
                {
                    path: '/alljobs',
                    element: (
                        <PrivateRoute>
                            <AllJobs></AllJobs>
                        </PrivateRoute>
                    ),
                    loader: () => fetch('http://localhost:3000/jobs')
                },
                {
                    path: '/jobdetail/:id',
                    element: (
                        <PrivateRoute>
                            <JobDetail></JobDetail>
                        </PrivateRoute>
                    ),
                    loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)

                },
                {
                    path: '/updatejob/:id',
                    element: (
                        <PrivateRoute>
                           <UpdateJob></UpdateJob>
                        </PrivateRoute>
                    ),
                    loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
                },
                {
                    path:'/addJob',
                    element: (
                        <PrivateRoute>
                            <AddJob></AddJob>
                        </PrivateRoute>
                    ),
                }
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