import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchJsonp from 'fetch-jsonp';
import Chanson from "../pages/Chanson";
import "./PageAlbum.css";

function PageAlbum() {
    const params = useParams();
    const [album, setAlbum] = useState();
    useEffect(() => {
        const fetchAlbum = async () => {
            const resp = await fetchJsonp(`https://api.deezer.com/album/${params.id}&output=jsonp`);
            const data = await resp.json();
            setAlbum(data);
        };
        fetchAlbum()
    }, [params]);
    if (!album) {
        return false;
    }

    return <div className="chansonAlbum">
        <h1>Chansons de l'album {album.title}</h1>
        <div className="chansonListe02">
            {album.tracks.data.map((result) => (
                <Chanson key={result.id} result={result} liste={album.tracks.data}></Chanson>
            ))}
        </div>
    </div>
}

export default PageAlbum