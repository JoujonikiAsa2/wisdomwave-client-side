import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext("")

// For firebase authentication

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
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
            
            axiosPublic.get(`/api/user/${currentUser?.email}`)
                .then(res => {
                    setUser(res.data.data)
                    console.log(res.data.data)
                    const loggedUser = res.data.data
                    setIsLoading(false)
                    console.log("Current user is: ", currentUser)
                    if (currentUser) {
                        axiosPublic.post('/api/jwt', loggedUser, { withCredentials: true })
                            .then(res => {
                                console.log('token response', res.data);
                            })
                    }
                    else {
                        axiosPublic.post('/api/logout', loggedUser, {
                            withCredentials: true
                        })
                            .then(res => {
                                console.log(res.data);
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            
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

