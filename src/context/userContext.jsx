import React, { useContext, useState, useEffect } from "react";
import { useAuth } from '../context/authContext';
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const userContext = React.createContext({
    utilisateur: null,
    lesFavoris: null,
    listes: null,
    nomDeListe: null,
    recherche: null,
    typeRecherche: null,
    statistiques: null,
    enLecture: null,
    listeEnLecture: null
});

const UserProvider = ({ children }) => {
    const { user } = useAuth();
    const [utilisateur, setUtilisateur] = useState({
        email: "",
        favoris: [],
        listes: [],
        nom: "",
        photo: "",
        statistiques: [],
        uid: "",
    });
    const lesFavoris = utilisateur.favoris;
    const listes = utilisateur.listes;
    const [nomDeListe, setNomDeListe] = useState('');
    const [recherche, setRecherche] = useState("");
    const [typeRecherche, setTypeRecherche] = useState("album");
    const statistiques = utilisateur.statistiques;
    const [enLecture, setEnLecture] = useState(null);
    const [listeEnLecture, setListeEnLecture] = useState(null);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'user', user.uid), (usager) => {
            setUtilisateur(usager.data());
        });
        return unsub;
    }, []);

    const toggleFavoris = (result) => {
        if (utilisateur.favoris.find(favori => favori.id === result.id) != undefined) {
            setUtilisateur(utilisateur => {
                const mesFavoris = utilisateur.favoris.filter((f) => {
                    return f.id !== result.id;
                })
                const monUtilisateur = {
                    ...utilisateur,
                    favoris: mesFavoris,
                };
                getFavori(mesFavoris);
                return monUtilisateur;
            });
        }
        else {
            setUtilisateur(utilisateur => {
                const mesFavoris = [result, ...utilisateur.favoris];
                if (mesFavoris.length > 100) mesFavoris.splice(-1, 1);
                const monUtilisateur = {
                    ...utilisateur,
                    favoris: mesFavoris,
                };
                getFavori(mesFavoris);
                return monUtilisateur;
            });
        }
    };

    const reorderFavoris = (mesFavoris) => {
        setUtilisateur(utilisateur => {
            const monUtilisateur = {
                ...utilisateur,
                favoris: mesFavoris,
            };
            getFavori(mesFavoris);
            return monUtilisateur;
        });
    }

    const createPlaylist = () => {
        if (utilisateur.listes.find(liste => liste.nom === nomDeListe) == undefined) {
            setUtilisateur(utilisateur => {
                const newPlaylist = {
                    nom: nomDeListe,
                    chansons: [],
                };
                const mesListes = [newPlaylist, ...utilisateur.listes];
                if (mesListes.length > 100) mesListes.splice(-1, 1);
                const monUtilisateur = {
                    ...utilisateur,
                    listes: mesListes,
                };
                getListes(mesListes);
                return monUtilisateur;
            });
        }
    }

    const ajouterChanson = async (ListeSelection, chanson) => {
        utilisateur.listes.map((liste, i) => {
            if (liste.nom === ListeSelection.nom) {
                const mesChansons = [chanson, ...liste.chansons];
                if (mesChansons.length > 100) mesChansons.splice(-1, 1);
                const maListe = {
                    ...liste,
                    chansons: mesChansons
                };
                utilisateur.listes[i] = maListe;
                setUtilisateur(utilisateur => {
                    const monUtilisateur = {
                        ...utilisateur,
                        listes: utilisateur.listes,
                    };
                    getListes(utilisateur.listes);
                    return monUtilisateur;
                });
            }
        })
    }

    const createNewPlaylistAndAddSong = async (chanson) => {
        if (nomDeListe.trim() !== '' && utilisateur.listes.find(liste => liste.nom === nomDeListe) == undefined) {
            setUtilisateur(utilisateur => {
                const newPlaylist = {
                    nom: nomDeListe,
                    chansons: [chanson],
                };
                const mesListes = [newPlaylist, ...utilisateur.listes];
                if (mesListes.length > 100) mesListes.splice(-1, 1);
                const monUtilisateur = {
                    ...utilisateur,
                    listes: mesListes,
                };
                getListes(mesListes);
                return monUtilisateur;
            });
        }
    }

    const reorderListe = async (ListeSelection) => {
        utilisateur.listes.map((liste, i) => {
            if (liste.nom === nomDeListe) {
                const mesChansons = ListeSelection;
                const maListe = {
                    ...liste,
                    chansons: mesChansons
                };
                utilisateur.listes[i] = maListe;
                setUtilisateur(utilisateur => {
                    const monUtilisateur = {
                        ...utilisateur,
                        listes: utilisateur.listes,
                    };
                    getListes(utilisateur.listes);
                    return monUtilisateur;
                });
            }
        })
    }

    const renameListe = async (nomAncien, nomNouveau) => {
        utilisateur.listes.map((liste, i) => {
            if (liste.nom === nomAncien) {
                const maListe = {
                    ...liste,
                    nom: nomNouveau
                };
                utilisateur.listes[i] = maListe;
                setUtilisateur(utilisateur => {
                    const monUtilisateur = {
                        ...utilisateur,
                        listes: utilisateur.listes,
                    };
                    getListes(utilisateur.listes);
                    return monUtilisateur;
                });
            }
        })
    }

    const supprimerChanson = async (ListeSelection, index) => {
        utilisateur.listes.map((liste, i) => {
            if (liste.nom === ListeSelection.nom) {
                const mesChansons = liste.chansons.filter((c, j) => {
                    return j !== index;
                })
                const maListe = {
                    ...liste,
                    chansons: mesChansons
                };
                utilisateur.listes[i] = maListe;
                setUtilisateur(utilisateur => {
                    const monUtilisateur = {
                        ...utilisateur,
                        listes: utilisateur.listes,
                    };
                    getListes(utilisateur.listes);
                    return monUtilisateur;
                });
            }
        })
    }

    const supprimerListe = async (ListeSelection) => {
        const mesListes = utilisateur.listes.filter((l) => {
            return l.nom !== ListeSelection.nom;
        })
        setUtilisateur(utilisateur => {
            const monUtilisateur = {
                ...utilisateur,
                listes: mesListes,
            };
            getListes(mesListes);
            return monUtilisateur;
        });
    };

    const addStatistiques = (result) => {
        if (utilisateur.statistiques.find(stat => stat.id === result.id) != undefined) {
            setUtilisateur(utilisateur => {
                const mesStats = utilisateur.statistiques;
                mesStats.map((s) => {
                    if (s.id === result.id) {
                        s.compteur++;
                    }
                })
                mesStats.sort((a, b) => (a.compteur < b.compteur) ? 1 : -1)
                const monUtilisateur = {
                    ...utilisateur,
                    statistiques: mesStats,
                };
                getStatistiques(mesStats);
                return monUtilisateur;
            });
        }
        else {
            setUtilisateur(utilisateur => {
                const mesStats = [result, ...utilisateur.statistiques];
                mesStats.map((s) => {
                    if (s.id === result.id) {
                        s.compteur = 1;
                    }
                })
                mesStats.sort((a, b) => (a.compteur < b.compteur) ? 1 : -1)
                if (mesStats.length > 100) mesStats.splice(-1, 1);
                const monUtilisateur = {
                    ...utilisateur,
                    statistiques: mesStats,
                };
                getStatistiques(mesStats);
                return monUtilisateur;
            });
        }
    };

    const getFavori = async (mesFavoris) => {
        const docRef = doc(db, 'user', user.uid);
        setDoc(docRef, { favoris: mesFavoris }, { merge: true });
    }

    const getListes = async (mesListes) => {
        const docRef = doc(db, 'user', user.uid);
        setDoc(docRef, { listes: mesListes }, { merge: true });
    }

    const getStatistiques = async (mesStats) => {
        const docRef = doc(db, 'user', user.uid);
        setDoc(docRef, { statistiques: mesStats }, { merge: true });
    }

    return (
        <userContext.Provider value={{
            utilisateur, setUtilisateur, lesFavoris, listes, nomDeListe, setNomDeListe, recherche, setRecherche, typeRecherche, setTypeRecherche, statistiques, enLecture, setEnLecture, listeEnLecture, setListeEnLecture,
            toggleFavoris, reorderFavoris, createPlaylist, ajouterChanson, createNewPlaylistAndAddSong, reorderListe, renameListe, supprimerChanson, supprimerListe, addStatistiques
        }} >
            {children}
        </userContext.Provider >
    )
};

const useUser = () => {
    const context = useContext(userContext);
    return context;
};

export { UserProvider, useUser };