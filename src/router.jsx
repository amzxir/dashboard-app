import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login/login";
import Register, { submitAction } from "./features/identity/components/register/register";
import IdentityLayouts from "./layouts/identity-layouts";
import Courses, { coursesLodear } from "./pages/courses";
import MainLayouts from "./layouts/MianLayouts/main-layouts";
import CoursesCategory from "./pages/courses-category";
import CoursesDetails, { detailsCoursesLoader } from "./features/courses/courses-details";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayouts/>,
        children:[
            {
                element:<Courses/>,
                index:true,
                loader:coursesLodear
            },
            {
                path:'course-categories',
                element:<CoursesCategory/>
            },
            {
                path:'courses-details/:id',
                element:<CoursesDetails/>,
                loader:detailsCoursesLoader
            }
        ]
    },
    {
        element:<IdentityLayouts/>,
        children:[
            {
                path:'login',
                element:<Login/>,
                errorElement:<Login/>,
                action:loginAction
            },
            {
                path:'register',
                element:<Register/>,
                errorElement:<Register/>,
                action:submitAction
            }
        ]
    },

]);

export default router;