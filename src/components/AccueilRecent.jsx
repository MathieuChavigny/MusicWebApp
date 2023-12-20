import { useState, useEffect } from 'react'
import fetchJsonp from 'fetch-jsonp';
import { motion } from "framer-motion";
import "./AccueilRecent.css";

function AccueilRecent() {
    const [resultat, setResultat] = useState([]);
    useEffect(() => {
        const getResultat = async () => {
            const resp = await fetchJsonp('https://api.deezer.com/editorial/0/charts?output=jsonp');
            const data = await resp.json();
            setResultat(data.albums.data);
        };
        getResultat();
    }, []);

    return <div className='accueilRecent'>
        <h2>Albums populaires</h2>
        <div className="chansonListe03">
            {resultat.map(({ id, title, artist, cover_big }) => (
                <div className="album02" key={id}>
                    <ul className="flex">
                        <li> <motion.img src={cover_big} alt="" initial={{ scale: 0 }} animate={{ rotate: [-25, 25, 0], scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.25
                            }} /></li>
                        <li className="txt"><p >{title}</p></li>
                        <li className="txt"><p >{artist.name}</p></li>
                    </ul>
                </div>
            ))}
        </div>
    </div>;
}

export default AccueilRecent