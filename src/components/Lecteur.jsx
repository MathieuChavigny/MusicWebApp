import { useUser } from "../context/userContext";
import { useAudio, useAudioEnded } from "../lib/audiotim";
import BarreLecture from "../components/BarreLecture";
import Animation from "./Animation.jsx";
import { FaCirclePlay } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaVolumeHigh } from "react-icons/fa6";
import "./Lecteur.css";

function Lecteur() {
    const { utilisateur, toggleFavoris, enLecture, listeEnLecture, setEnLecture } = useUser();
    const { changeSource, togglePause, volume, changeVolume } = useAudio(false);
    const handleFavoris = () => {
        const monFavori = {
            album: enLecture.album,
            artist: enLecture.artist,
            compteur: 0,
            duration: enLecture.duration,
            id: enLecture.id,
            link: enLecture.link,
            preview: enLecture.preview,
            title: enLecture.title,
        }
        toggleFavoris(monFavori);
    }
    const handleVolume = (event) => {
        changeVolume(event.target.value / 100);
    }
    const handleSuivant = () => {
        let index = listeEnLecture.findIndex(chanson => chanson.id === enLecture.id);
        let i = (index + 1) % listeEnLecture.length;
        setEnLecture(listeEnLecture[i]);
        changeSource(listeEnLecture[i].preview);
    }
    const handlePrecedent = () => {
        let index = listeEnLecture.findIndex(chanson => chanson.id === enLecture.id);
        let i = (index === 0 ? listeEnLecture.length - 1 : index - 1);
        setEnLecture(listeEnLecture[i]);
        changeSource(listeEnLecture[i].preview);
    }
    useAudioEnded(() => {
        handleSuivant();
    });
    if (enLecture === null) {
        return false;
    }

    return <div className="lec">
        <div className="lecteurFlex">
            <button disabled={!enLecture} onClick={handlePrecedent}>
                <FaBackward className="precedent"
                    style={{ cursor: "pointer", color: "#FFFFFF" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#616AAE"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#FFFFFF"} />
            </button>
            <button disabled={!enLecture} onClick={togglePause}>
                <FaCirclePlay className="play"
                    style={{ cursor: "pointer", color: "#FFFFFF" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#616AAE"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#FFFFFF"} />
            </button>
            <button disabled={!enLecture} onClick={handleSuivant}>
                <FaForward className="suivant"
                    style={{ cursor: "pointer", color: "#FFFFFF" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#616AAE"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#FFFFFF"} />
            </button>
            <div className="position">
                <div className="animation">
                    <Animation></Animation>
                    <div className="lecturePosition">
                        <BarreLecture></BarreLecture>
                    </div>

                </div>
            </div>
        </div>
        <div className="volumePosition">
            {enLecture ? (
                <div className="infoLecteur">
                    <p>{enLecture.title}</p>
                    <p>{enLecture.artist.name}</p>

                </div>
            ) : (null)}
            <FaVolumeHigh className="son"
                style={{ cursor: "pointer", color: "#E076AB" }}
                onMouseOver={(e) => e.currentTarget.style.color = "#7D3B64"}
                onMouseOut={(e) => e.currentTarget.style.color = "#E076AB"} />
            <input className="volume" disabled={!enLecture} onChange={(event) => handleVolume(event)} type="range" min="1" max="100" value={volume * 100} />

            <button type='submit' disabled={!enLecture} onClick={() => handleFavoris()} className={enLecture ? utilisateur.favoris.find(favori => favori.id === enLecture.id) != undefined ? "on" : "off" : null}>
                <MdFavorite className="favoris"
                    style={{ cursor: "pointer", color: "#FFFFFF" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "#616AAE"}
                    onMouseOut={(e) => e.currentTarget.style.color = "#FFFFFF"} />
            </button>
        </div>
    </div>
}

export default Lecteur