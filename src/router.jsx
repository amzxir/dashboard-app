import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login/login";
import Register, { submitAction } from "./features/identity/components/register/register";
import IdentityLayouts from "./layouts/identity-layouts";
import MainLayouts from "./layouts/main-layouts";
import Courses from "./pages/courses";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayouts/>,
        children:[
            {
                element:<Courses/>,
                index:true,
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