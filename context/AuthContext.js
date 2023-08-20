import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { async } from "@firebase/util";
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

      // Create a reference to the user's document within the "users" collection
      const userDocRef = doc(db, "users", authUser.user.uid);

      // Set the user's data using the setDoc function
      await setDoc(userDocRef, {
        username,
        // other user data...
      });
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
