import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import AllJobs from "../pages/AllJobs";
import AddJob from "../pages/AddJob";
import PrivateRoute from '../provider/PrivateRoute';
import JobDetail from "../pages/JobDetail";
import UpdateJob from "../pages/updateJob";
import MyJobs from "../pages/MyJobs";
import AcceptedJobs from "../pages/AcceptedJobs";
import Loading from "../pages/Loading";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import Terms from "../pages/Terms";
import { Suspense } from "react";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                    loader: () => fetch('https://freelancer-server-omega.vercel.app/latestJobs')
                },
                {
                    path: '/alljobs',
                    element: (
                            <AllJobs></AllJobs>
                    ),
                    loader: () => fetch('https://freelancer-server-omega.vercel.app/jobs'),
                },
                {
                    path: '/jobdetail/:id',
                    element: (
                        <JobDetail></JobDetail>
                    )

                },
                {
                    path: '/updatejob/:id',
                    element: (
                        <PrivateRoute>
                            <UpdateJob></UpdateJob>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/addJob',
                    element: (
                        <PrivateRoute>
                            <AddJob></AddJob>
                        </PrivateRoute>
                    ),
                },
                {
                    path: '/myaddedjobs',
                    element: (
                        <PrivateRoute>
                            <MyJobs></MyJobs>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/myjobs',
                    element: (
                        <PrivateRoute>
                            <AcceptedJobs></AcceptedJobs>
                        </PrivateRoute>
                    )
                },
                {
                    path: '/terms',
                    element: <Terms></Terms>
                }
            ]
        },
        {
            path: '/dashboard',
            element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
            children: [
                {
                    path: '/dashboard/profile',
                    element:<Profile></Profile>
                },
                {
                    path: '/dashboard/settings',
                    element: <Setting></Setting>
                },
            ]
        },
        {
            path: "/auth",
            element: <AuthLayout></AuthLayout>,
            children: [
                {
                    path: "/auth/login",
                    element: <Login></Login>,
                },
                {
                    path: "/auth/registration",
                    element: <Register></Register>,
                }
            ]
        },
        {
            path: "/*",
            element: <Error></Error>
        }
    ]
);

export default router;