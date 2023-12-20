import { useState } from "react";
import { Link } from 'react-router-dom';
import { useUser } from "../context/userContext";
import { useAudio } from "../lib/audiotim";
import "./Chanson.css";
import { IoIosMore } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";

function Chanson({ result, liste }) {
    const { utilisateur, setEnLecture, setListeEnLecture, addStatistiques, setNomDeListe, nomDeListe, createNewPlaylistAndAddSong, ajouterChanson } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const { changeSource } = useAudio();

    const handleChanson = (liste) => {
        const maChanson = {
            album: result.album,
            artist: result.artist,
            compteur: 0,
            duration: result.duration,
            id: result.id,
            link: result.link,
            preview: result.preview,
            title: result.title,
        }
        ajouterChanson(liste, maChanson);
    }

    const handleChansonListe = () => {
        const maChanson = {
            album: result.album,
            artist: result.artist,
            compteur: 0,
            duration: result.duration,
            id: result.id,
            link: result.link,
            preview: result.preview,
            title: result.title,
        }
        createNewPlaylistAndAddSong(maChanson);
    }

    const handleClick = (result) => {
        setListeEnLecture(liste);
        setEnLecture(result);
        changeSource(result.preview);
        const maChanson = {
            album: result.album,
            artist: result.artist,
            compteur: 0,
            duration: result.duration,
            id: result.id,
            link: result.link,
            preview: result.preview,
            title: result.title,
        }
        addStatistiques(maChanson);
    }

    const handleOpen = (bool) => {
        setIsOpen(bool)
    }

    return <div className="chanson">
        <div className="chansonFlex">
            <img src={result.album.cover_medium} alt="" />
            <div className="infoChanson">
                <h2 onClick={() => handleClick(result)}>{result.title}</h2>
                <div className="infoArtist">
                    <Link to={`/artiste/${result.artist.id}`} >{result.artist.name}</Link>
                </div>
                <div className="infoAlbum">
                    <Link to={`/album/${result.album.id}`} >{result.album.title}</Link>
                </div>
            </div>
            <div className="details">
                <button type='submit' onClick={() => handleClick(result)}>
                    <FaCirclePlay className="play"
                        style={{ cursor: "pointer", color: "#E076AB" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
                </button>
                <button className="btnDetails" type='submit' onClick={() => handleOpen(true)}>
                    <IoIosMore className="iconDetails"
                        style={{ cursor: "pointer", color: "#E076AB" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                        onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} /></button>
                <div className={isOpen ? "active" : "inactive"}>
                    <div className="pop">
                        <button className="fermer" onClick={() => handleOpen(false)}>
                            <IoCloseCircleOutline className="ajoute"
                                style={{ cursor: "pointer", color: "#E076AB" }}
                                onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                                onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
                        </button>
                        <h2>Nommez votre nouvelle liste de lecture:</h2>
                        <div className="choisirListe">
                            <input type="text" value={nomDeListe} onChange={(e) => setNomDeListe(e.target.value)} />
                            <button className="creer" onClick={() => handleChansonListe()}>Créer</button>
                        </div>
                        <h2>Ajouter à l'album:</h2>
                        <ul>
                            {utilisateur.listes.map((liste) => (
                                <li key={liste.nom}>
                                    <button onClick={() => handleChanson(liste)}>{liste.nom}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Chanson