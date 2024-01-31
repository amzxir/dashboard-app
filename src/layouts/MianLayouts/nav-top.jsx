import ChangeLanguage from "../../components/chnage-language";
import ChangeTheme from "../../components/chnage-theme";
import { useAppContext } from "../../context/app/app-context";

const NavTop = () => {

    const { chnageSidebar } = useAppContext();

    return (
        <nav className="navbar">
            <a className="sidebar-toggle" onClick={chnageSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>
            <div className="d-flex align-items-center gap-3 ms-auto me-3">
                <ChangeLanguage />
                <ChangeTheme />
            </div>
        </nav>
    )
}

export default NavTop;