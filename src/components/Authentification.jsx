import { useState } from "react";
import { useAuth } from "../context/authContext";
import logoImage from '../assets/img/logoTempo.png';
import "./Authentification.css";

const Authentification = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault(); try {
      await login();
    } catch (e) {
      setAuth({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="connexion">
      <div className="logo02">
        <img className='logo' src={logoImage} alt="tempo" />
      </div>
      <div className="btnConnexion">
        <button onClick={handleLogin}>Se connecter</button>
      </div>
    </div>
  );
};

export default Authentification;