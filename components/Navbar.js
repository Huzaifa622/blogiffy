import { useAuthContext, userAuthContext } from "@/context/AuthContext";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import Image from 'next/image';

import React from "react";

const Navbar = () => {
  const { user, googleSignIn, logOut } = userAuthContext();
  const handleSignIn = async () => {
    await googleSignIn();
  };
  const handleSignOut = async () => {
    await logOut();
  };
  return (
    <div className="flex justify-around h-[2.5rem] items-center bg-indigo-600 text-white">
      <h1>Welcome to blogging page</h1>
      <div className="flex ">
      {!user ? (<>
        <div className="cursor-pointer pr-2" onClick={handleSignIn}>
          Login With gmail
        </div>
        <Link className="pr-2" href={'/login'}>Login</Link>
        <Link href={'/signin'}>Signup</Link>
        </>
      ) : (
        <>
        <img src={auth.currentUser.photoURL} width={30} height={30} className="pr-2 rounded-full"/>
          <div className="pr-6">{auth.currentUser.email}</div>
          <div className="cursor-pointer" onClick={handleSignOut}>
            Signout
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Navbar;
