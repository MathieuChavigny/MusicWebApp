import { useNavigate } from "react-router-dom";
import "./Recherche.css";
import { useUser } from "../context/userContext";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

function Recherche() {
  const { setRecherche, setTypeRecherche } = useUser();
  const [rechercheTemp, setRechercheTemp] = useState("");
  const [typeTemp, setTypeTemp] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setRechercheTemp(event.target.value);
  }
  const handleSelect = (event) => {
    setTypeTemp(event.target.value);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    if (rechercheTemp.trim() !== "") {
      setRecherche(rechercheTemp);
      setTypeRecherche(typeTemp);
      if (typeTemp === "chanson") {
        navigate("/recherche-chanson");
      } else if (typeTemp === "artiste") {
        navigate("/recherche-artiste");
      } else {
        navigate("/recherche-album");
      }
    }
    setRechercheTemp("");
  };

  return (
    <form className="formRecherche" onSubmit={handleClick}>
      <input className="recherche"
        onChange={handleChange}
        value={rechercheTemp}
        type="text"
        placeholder="Recherche"
      />
      <select className="option" onChange={handleSelect} value={typeTemp} name="recherche">
        <option value="album">Album</option>
        <option value="artiste">Artiste</option>
        <option value="chanson">Chanson</option>
      </select>
      <button className="btnRecherche" type='submit'>
        <IoSearch className="iconRecherche"
          style={{ cursor: "pointer", color: "#E076AB" }}
          onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
          onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} /></button>
    </form>
  );
}

export default Recherche;