import { useUser } from "../context/userContext";
import { useAuth } from "../context/authContext";
import "./User.css";
import { CiLogout } from "react-icons/ci";

const User = () => {
    const { utilisateur } = useUser();
    const { logout } = useAuth();

    return (
        <div className="user02">
            <div className="userFlex">
                <img src={utilisateur.photo} alt="" />
                <h4>{utilisateur.nom}</h4>
                <button onClick={logout}>
                    <CiLogout className="iconOut"
                        style={{ cursor: "pointer", color: "#E076AB" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
                </button>
            </div>
        </div>
    )
}

export default User;