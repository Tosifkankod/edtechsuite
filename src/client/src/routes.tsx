import { createBrowserRouter } from "react-router-dom";
import RootLayout from './layout/RootLayout';
import { courseRoutes } from "./modules/course/course.route";

export const router = createBrowserRouter([
    {
        path: '/course',
        element: <RootLayout />,
        children: [
            ...courseRoutes
        ]
    }

])