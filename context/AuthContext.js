import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database } from "@/utils/firebase";
import { async } from "@firebase/util";
import { ref, set } from "firebase/database";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };

  async function signup(email, password, username) {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      set(ref(database , 'users/'+ auth.currentUser.uid),{
         email, 
         username,
      })
      console.log('success')
    } catch (error) {
      // Handle error
    }
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
    });
    return () => unSub;
  }, [user]);
  return (
    <AuthContext.Provider value={{ logOut, googleSignIn, user, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};
const userAuthContext = () => {
  return useContext(AuthContext);
};

export { userAuthContext };
