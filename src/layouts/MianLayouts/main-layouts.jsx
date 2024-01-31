import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./footer"
import NavTop from "./nav-top"
import Sidebar from "./sidebar"

const MainLayouts = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        navigate('/login')
    }

    return (
        <div className="wrapper" style={{ minHeight: '100h' }}>
            <Sidebar/>
            <div className="main">
                <NavTop/>
                <main className="content">
                    <div className="container-fluid p-0">
                        <Outlet />
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    )
}

export default MainLayouts