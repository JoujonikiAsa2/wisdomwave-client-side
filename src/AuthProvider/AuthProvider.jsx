import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext("")

// For firebase authentication

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const login = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signUp = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserInfo = (name, phone, image) => {
        return updateProfile(auth.currentUser, {
            name: name,
            phoneNumber: phone,
            photoURL: image
        })
    }

    useEffect(() => {

        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            return subscriber()
        }
    }, [])


    const userSignOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        isLoading,
        login,
        signUp,
        googleLogin,
        updateUserInfo,
        userSignOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    )
};

export default AuthProvider;

