import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchJsonp from 'fetch-jsonp';
import Album from "./Album";
import Chanson from "./Chanson";
import Artiste from "./Artiste";
import "./PageArtiste.css";

function PageArtiste() {
    const params = useParams();
    const [artiste, setArtiste] = useState();
    const [albums, setAlbums] = useState();
    const [chansons, setChansons] = useState();
    const [related, setRelated] = useState();
    useEffect(() => {
        const fetchArtiste = async () => {
            const resp = await fetchJsonp(`https://api.deezer.com/artist/${params.id}&output=jsonp`);
            const data = await resp.json();
            setArtiste(data);
        };
        fetchArtiste()
        const fetchAlbums = async () => {
            const resp = await fetchJsonp(`https://api.deezer.com/artist/${params.id}/albums&output=jsonp`);
            const data = await resp.json();
            setAlbums(data.data);
        };
        fetchAlbums()
        const fetchChansons = async () => {
            const resp = await fetchJsonp(`https://api.deezer.com/artist/${params.id}/top?limit=50&output=jsonp`);
            const data = await resp.json();
            setChansons(data.data);
        };
        fetchChansons()
        const fetchRelated = async () => {
            const resp = await fetchJsonp(`https://api.deezer.com/artist/${params.id}/related&output=jsonp`)
            const data = await resp.json();
            setRelated(data.data);
        };
        fetchRelated()
    }, [params]);

    if (!albums) {
        return false;
    }
    else if (!artiste) {
        return false;
    }
    else if (!chansons) {
        return false;
    }

    return <div className="albumArtiste">
        <h1 className="artisteNom" >Albums de l'artiste {artiste.name}</h1>
        <div className="flexAlbum">
            {albums.map((result) => (
                <Album key={result.id} title={result.title} artist={artiste} cover={result.cover_big} id={result.id}></Album>
            ))}
        </div>
        <h1>Chansons les plus populaires</h1>
        <div className="chansonPop">
            {chansons.map((result) => (
                <Chanson key={result.id} result={result} liste={chansons}></Chanson>
            ))}
        </div>
        <h2>Artistes similaires</h2>
        <div className="related">
            {related.map((result) => (

                <Artiste name={result.name} picture={result.picture_big} id={result.id} key={result.id}></Artiste>
            ))}
        </div>
    </div>
}

export default PageArtiste