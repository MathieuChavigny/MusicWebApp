import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { Reorder } from "framer-motion";
import Chanson from "../pages/Chanson";
import "./Favoris.css";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function Favoris() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { lesFavoris, reorderFavoris } = useUser();
    const [listes, setListes] = useState([]);
    useEffect(() => {
        setListes(lesFavoris)
    }, [lesFavoris]);
    if (lesFavoris.length != 0) {
        return (
            <div className="listeFavoris">
                <Reorder.Group axis={windowDimensions.width > 768 ? "x" : "y"} values={listes} onReorder={reorderFavoris}>{
                    listes.map(result => (
                        <Reorder.Item key={result.id} value={result}>{<Chanson key={result.id} result={result} liste={lesFavoris}></Chanson>}</Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        )
    }
    else {
        return <div className="listeFavoris">
            Vous n'avez pas encore de chansons favorites.
        </div>;
    }
}

export default Favoris