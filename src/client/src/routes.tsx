import { createBrowserRouter } from "react-router-dom";
import RootLayout from './layout/RootLayout';
import { courseRoutes } from "./modules/course/course.route";
import { studentRoutes } from "./modules/student/student.route";
import { trainerRoutes } from "./modules/trainers/trainer.route";

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
    },
    {
        path: '/trainer',
        element: <RootLayout />,
        children: [
            ...trainerRoutes
        ]
    }
])