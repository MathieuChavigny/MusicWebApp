import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from '../config/firebase';
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const authContext = React.createContext({
    login: async (email, password) => { },
    logout: async () => { },
    user: null,
    isLoading: null
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setIsLoading(false);
            setUser(user);
        });
        return unsub;
    }, [user]);
    const login = async () => {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        const monDocument = await getDoc(doc(db, 'user', user.user.uid));
        if (!monDocument.exists()) {
            const docRef = await setDoc(doc(db, "user", user.user.uid), {
                nom: user.user.displayName,
                email: user.user.email,
                photo: user.user.photoURL,
                favoris: [],
                listes: [],
                statistiques: [],
                uid: user.user.uid,
            })
        }
        setUser(user);
    };
    const logout = async () => {
        signOut(auth);
        setUser(null);
    };

    return (
        <authContext.Provider value={{ login, logout, user, isLoading }}>
            {children}
        </authContext.Provider>
    )
};

const useAuth = () => {
    const context = useContext(authContext);
    if (context._v === 0) {
        throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };