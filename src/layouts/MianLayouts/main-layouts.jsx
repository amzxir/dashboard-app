import { useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "./footer"
import NavTop from "./nav-top"
import Sidebar from "./sidebar"

const MainLayouts = () => {

    const [collapseSidebar, setCollapseSidebar] = useState(false);

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