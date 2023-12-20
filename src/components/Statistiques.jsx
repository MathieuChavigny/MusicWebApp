import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import fetchJsonp from 'fetch-jsonp';
import Artiste from "../pages/Artiste";
import Chanson from "../pages/Chanson";
import "./AccueilRecent.css";
import "./Statistiques.css";

function Statistiques() {
    const { statistiques } = useUser();
    const [related, setRelated] = useState([]);
    useEffect(() => {
        if (statistiques.length > 0) {
            let compteur = 0;
            const fetchRelated = async (id) => {
                const resp = await fetchJsonp(`https://api.deezer.com/artist/${id}/related&output=jsonp`)
                const data = await resp.json();
                if (data.data.length > 0) {
                    setRelated(data.data);
                } else if (compteur < statistiques.length) {
                    compteur++;
                    fetchRelated(statistiques[compteur].artist.id);
                }
            };
            fetchRelated(statistiques[compteur].artist.id);
        }
    }, [statistiques]);

    return <div className='ecouteFreq'>
        <h2 className="ecoute">Écoutés fréquemment</h2>
        {statistiques.length > 0 ? <div>
            <div className="statFlex">
            {statistiques.map((result, i) => (
                i < 5 ? <Chanson key={result.id} result={result} liste={statistiques}></Chanson> : null
            ))}
            </div>
        </div> : <div>
            
            <p>Vous n'avez pas encore écouté de chansons.</p>
        </div>}
        <div className='ecouteFreq'>
        <h2 className="ecoute">Vous pourriez aimer</h2>
        {related.length > 0 ? <div className="artisteFlex">
            {related.map((result, i) => (
                i < 5 ? <Artiste key={i} name={result.name} picture={result.picture_medium} id={result.id}></Artiste> : null
            ))}
        </div> : <div>
            <p>Vous n'avez pas encore écouté assez de chansons.</p>
        </div>}
        </div>
    </div>;
}

export default Statistiques