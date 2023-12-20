import { useState } from "react";
import { useUser } from "../context/userContext";
import Favoris from "../components/Favoris";
import ListeLecture from "../components/ListeLecture";
import "./ListesLecture.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";


function ListesLecture() {
  const { nomDeListe, setNomDeListe, createPlaylist, listes } = useUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState();
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const nommerListe = () => {
    setIsErrorOpen(false);
    listes.map((liste, i) => {
      console.log(nomDeListe);
      if (nomDeListe === liste.nom) {
        setIsErrorOpen(true);
      }
    })
    if (!isErrorOpen) createPlaylist;
  }

  return (
    <div className="listeLecture02">
      <div className="infoLecture">
        <h2>Mes listes de lecture</h2>
        <button className="ouvrePop" onClick={openPopup}>
          <IoAddCircleOutline className="ajoute"
            style={{ cursor: "pointer", color: "#E076AB" }}
            onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
            onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
          Créer une nouvelle liste de lecture
        </button>
        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <h3>Nommez votre nouvelle liste de lecture :</h3>
              <div className="nouvelleListe">
                <input
                  type="text"
                  value={nomDeListe}
                  onChange={(e) => setNomDeListe(e.target.value)}
                />
                {isErrorOpen && (
                  <h3>Ce nom de liste est déjà pris!</h3>
                )}
                <button onClick={() => nommerListe()}>Créer</button>
              </div>
              <button className="closePopup" onClick={closePopup}>
                <IoCloseCircleOutline className="ajoute"
                  style={{ cursor: "pointer", color: "#E076AB" }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="liLecture">
        <div className="lectureFlex">
          <h3>Mes favoris</h3>
        </div>
        <Favoris></Favoris>
        {listes.map((result, i) => (
          <ListeLecture key={i} liste={result}></ListeLecture>
        ))}
      </div>
    </div>
  );
}

export default ListesLecture;
