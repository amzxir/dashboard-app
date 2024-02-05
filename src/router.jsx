import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login/login";
import Register, { submitAction } from "./features/identity/components/register/register";
import IdentityLayouts from "./layouts/identity-layouts";
import Courses, { coursesLodear } from "./pages/courses";
import MainLayouts from "./layouts/MianLayouts/main-layouts";
import CoursesCategory, { coursesCategoryLoader } from "./pages/courses-category";
import CoursesDetails, { detailsCoursesLoader } from "./features/courses/components/courses-details";
import { CategoryProvider } from "./features/category/components/category-context";
import NotFound from "./pages/not-found";
import UnhandledException from "./pages/unhandled-exception";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayouts />,
        errorElement:<UnhandledException/>,
        children: [
            {
                element: <Courses />,
                index: true,
                loader: coursesLodear
            },
            {
                path: 'course-categories',
                element: (
                    <CategoryProvider>
                        <CoursesCategory />
                    </CategoryProvider>
                ),
                loader: coursesCategoryLoader
            },
            {
                path: 'courses-details/:id',
                element: <CoursesDetails />,
                loader: detailsCoursesLoader
            }
        ]
    },
    {
        element: <IdentityLayouts />,
        children: [
            {
                path: 'login',
                element: <Login />,
                errorElement: <Login />,
                action: loginAction
            },
            {
                path: 'register',
                element: <Register />,
                errorElement: <Register />,
                action: submitAction
            }
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    }

]);

export default router;