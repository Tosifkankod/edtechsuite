import { createBrowserRouter } from "react-router-dom";
import RootLayout from './layout/RootLayout';
import { courseRoutes } from "./modules/course/course.route";
import { studentRoutes } from "./modules/student/student.route";

export const router = createBrowserRouter([
    {
        path: '/course',
        element: <RootLayout />,
        children: [
            ...courseRoutes
        ]
    },
    {
        path: '/student',
        element: <RootLayout />,
        children: [
            ...studentRoutes
        ]
    }
])