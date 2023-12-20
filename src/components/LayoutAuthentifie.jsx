import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Lecteur from "./Lecteur";
import { UserProvider } from '../context/userContext.jsx';
import { AudioProvider } from "../lib/audiotim";
import "./LayoutAuthentifie.css";

const LayoutAuthentifie = () => {
    return (
        <UserProvider>
            <AudioProvider>
                <div>
                    <Navigation></Navigation>
                    <Outlet></Outlet>
                </div>
                <div className="lecteur">
                    <Lecteur></Lecteur>
                </div>
            </AudioProvider>
        </UserProvider>
    );
};

export default LayoutAuthentifie;