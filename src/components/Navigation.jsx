import Recherche from "./Recherche";
import { Link, useLocation } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaMusic } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import logoImage from '../assets/img/logoTempo.png';
import { useNavigate } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ recherche, setRecherche }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <nav>
            <ul className="navPrincipal">
                <li>
                    <IoArrowBackCircleOutline
                        className="icon retour"
                        onClick={() => navigate(-1)} // navigate back
                        style={{ cursor: "pointer", color: "#E076AB" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"}
                    />
                </li>
                <li>
                    <img className='logo' src={logoImage} alt="tempo" />
                </li>
                <li className="lirecherche">
                    <Recherche recherche={recherche} setRecherche={setRecherche}></Recherche>
                </li>
                <li>
                    <Link to="/listes" className={pathname.startsWith("/listes") ? "active" : ""}>
                        <FaMusic className="listeLecture"
                            style={{ cursor: "pointer", color: "#E076AB" }}
                            onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                            onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
                    </Link>
                </li>
                <li>
                    <Link to="/tableau" className={pathname.startsWith("/tableau") ? "active" : ""}>
                        <FaUser className="user"
                            style={{ cursor: "pointer", color: "#E076AB" }}
                            onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                            onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;