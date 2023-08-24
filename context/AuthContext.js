import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, database, storage } from "@/utils/firebase";
import { async } from "@firebase/util";
import { onValue, ref, set } from "firebase/database";
import { uploadBytes , ref as stRef , getDownloadURL } from "firebase/storage";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };
  async function uploadImage(file) {
    const storageRef = stRef(storage, 'userImages/' + file.name);
    await uploadBytes(storageRef, file);
  
    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }
  async function signup(email, password, username ,userImage) {
    try {

      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const imageUrl = await uploadImage(userImage);
      set(ref(database, "users/" + auth.currentUser.uid), {
        email,
        username,
        imageUrl,
      });
      console.log("success");
    } catch (error) {
      console.log('not logged in')
    }
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
   
    if(curUser){
    const userRef = ref(database , `users/${curUser.uid}`);

    onValue(userRef , (snapshot) => {
      const userDataFromDatabase = snapshot.val();
      setUserData(userDataFromDatabase);
    });}else{
      setUserData(null);
    }
  })
    return () => unSub;
  }, [user]);
  return (
    <AuthContext.Provider value={{ logOut, googleSignIn, user, signup, login , userData , uploadImage  }}>
      {children}
    </AuthContext.Provider>
  );
};
const userAuthContext = () => {
  return useContext(AuthContext);
};

export { userAuthContext };
