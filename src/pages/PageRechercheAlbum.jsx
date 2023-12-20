import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUser } from "../context/userContext";
import fetchJsonp from 'fetch-jsonp';
import Skeleton from "../components/Skeleton";
import Album from "./Album";
import "./Recherche.css";

function PageRechercheAlbum() {
    const { recherche, typeRecherche } = useUser();
    const [resultat, setResultat] = useState({
        items: null,
        total: 0
    });
    const [hasMore, setHasMore] = useState(true);
    const [donnees, setDonnees] = useState(null);
    useEffect(() => {
        const fetchRecherche = async () => {
            const resp = await fetchJsonp(`https://api.deezer.com/search/album?q=${recherche}&output=jsonp`);
            const data = await resp.json();
            setResultat(resultat => {
                const monResultat = {
                    ...resultat,
                    items: data.data,
                    total: data.total
                };
                return monResultat;
            });
            setDonnees(data);
        };
        fetchRecherche()
    }, [recherche, typeRecherche]);
    const fetchMoreData = async () => {
        if (resultat.items.length >= resultat.total - 25) {
            setHasMore(false);
            return;
        }
        const resp = await fetchJsonp(donnees.next);
        const data = await resp.json();
        setResultat(resultat => {
            let mesItems = resultat.items;
            data.data.map((result => (mesItems = [...mesItems, result])))
            const monResultat = {
                ...resultat,
                items: mesItems
            };
            return monResultat;
        });
        setDonnees(data);
    };

    if (!resultat.items || resultat.total === 0) {
        return false;
    } else {
        return <div className="resultat">
            <div className="resultTxt">
                <h1 className="result"><span> Résultat de la recherche: </span> {recherche}</h1>
            </div>
            <div >
                <InfiniteScroll
                    dataLength={resultat.items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton></Skeleton>}>
                    {resultat.items.map((result, i) => (
                        <Album key={i} title={result.title} artist={result.artist.name} cover={result.cover_big} id={result.id}></Album>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    }
}

export default PageRechercheAlbum