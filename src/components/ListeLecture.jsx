import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { Reorder } from "framer-motion";
import Chanson from "../pages/Chanson";
import "./ListeLecture.css";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function ListeLecture({ liste }) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    let { setNomDeListe, reorderListe, renameListe, supprimerChanson, supprimerListe } = useUser();
    const [listes, setListes] = useState([]);
    const [nom, setNom] = useState([]);
    useEffect(() => {
        setListes(liste.chansons);
    }, [liste]);
    const nommerListe = () => {
        let existant = false;
        listes.map((liste, i) => {
            if (nom === liste.nom) {
                existant = true;
            }
        })
        if (!existant) renameListe(liste.nom, nom);
    }
    if (liste.chansons.length != 0) {
        return <div className="lectureFlex02">
            <div className="titreAlbum">
                <h3>Votre album : {liste.nom}
                    </h3>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Renommer votre album"
                    />
                <button className="mr" onClick={() => nommerListe()}>Enregistrer</button>
                <button onClick={() => supprimerListe(liste)}>Supprimer cet album</button>
            </div>
            <div className="r">
                <Reorder.Group axis={windowDimensions.width > 768 ? "x" : "y"} values={listes} onReorder={reorderListe} onClick={setNomDeListe(liste.nom)}>{
                    listes.map((result,i) => (
                        <Reorder.Item key={result.id} value={result}>{<><Chanson key={result.id} result={result} liste={liste.chansons}></Chanson>
                            <button className="btnSup" onClick={() => supprimerChanson(liste, i)}>Supprimer</button></>}</Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    }
}

export default ListeLecture