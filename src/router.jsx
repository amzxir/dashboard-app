import { createBrowserRouter } from "react-router-dom";
import Login from "./features/identity/components/login/login";
import Register from "./features/identity/components/register/register";
import IdentityLayouts from "./layouts/identity-layouts";

const router = createBrowserRouter([
    {
        element:<IdentityLayouts/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    },

]);

export default router;