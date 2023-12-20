import { Outlet } from "react-router-dom";
import Authentification from "./Authentification";

const Layout = () => {
    return (
        <div>
            <Authentification></Authentification>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;