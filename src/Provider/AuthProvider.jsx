/* eslint-disable react/prop-types */

import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import axios from 'axios'

import { app } from "../firebase/Firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const logOut = async () => {
        setLoading(true)
        try {
           await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true
          });
          await signOut(auth)
        }
         catch (error) {
          console.error(error)
        }
      };
  

    const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email
            const loggedUser = {email:userEmail}
            setUser(currentUser);
            if(currentUser){
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, {withCredentials:true})
                .then(res=>{
                  console.log('ok')
                })
              }
            else{
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser, {withCredentials:true})
                .then(res=>{
                  console.log(res.data)
              })}
              setLoading(false)
        });
        return () => {
            return unsubscribe();
        }
    }, [user?.email])


    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;