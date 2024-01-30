import { useEffect, useRef, useState } from "react";
import enFlag from "@assets/images/us.png";
import faFlag from "@assets/images/fa.png";
import { useAppContext } from "../context/app/app-context";

const ChangeLanguage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { chnageLan , language } = useAppContext();

    const ref = useRef();

    useEffect(() => {

        const checkIfCleckOutSide = (e) => {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', checkIfCleckOutSide)

        return () => {
            document.removeEventListener('mousedown', checkIfCleckOutSide)
        }
    }, [isOpen])

    return (
        <div className="dropdown">
            <a onClick={() => setIsOpen(true)} className="nav-flag dropdown-toggle">
                <img src={language === "fa" ? faFlag : enFlag} alt="" />
            </a>
            <div ref={ref} className={`dropdown-menu dropdown-menu-end ${isOpen && 'show'}`}>
                <a className={`dropdown-item fw-bolder d-flex align-items-center gap-2 ${language === 'fa' ? 'text-end' : 'text-start'}`} onClick={() => chnageLan("fa")}>
                    <img src={faFlag} width="20" className="ms-2" alt="" />
                    <span className="align-middle">فارسی</span>
                </a>
                <a className={`dropdown-item fw-bolder d-flex align-items-center gap-2 ${language === 'fa' ? 'text-end' : 'text-start'}`} onClick={() => chnageLan("en")}>
                    <img src={enFlag} width="20" className="ms-2" alt="" />
                    <span className="align-middle">English</span>
                </a>
            </div>
        </div>
    )
}

export default ChangeLanguage;