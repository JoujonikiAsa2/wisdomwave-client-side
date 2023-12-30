import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext()

// For firebase authentication

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const login = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const studentSignUp = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserInfo = (name, phone) =>{
        return updateProfile(user, {
            displayName: name, 
            phoneNumber:phone,
        })
    }

    useEffect(() => {
        const subsciber = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setUser(currentUser)
            setIsLoading(false)
        })
        return () => {
            return subsciber()
        }
    }, [])

    const userSignOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        isLoading,
        login,
        studentSignUp,
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