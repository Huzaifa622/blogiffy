import { useAuthContext, userAuthContext } from "@/context/AuthContext";
import { auth } from "@/utils/firebase";
import Link from "next/link";
import Image from "next/image";

import React from "react";

const Navbar = () => {
  const { user , userData, googleSignIn, logOut } = userAuthContext();
  const handleSignIn = async () => {
    await googleSignIn();
  };
  const handleSignOut = async () => {
    await logOut();
  };
  return (
    <div className="flex justify-around w-screen h-[2.5rem] items-center bg-indigo-600 text-white">
      <h1>Welcome to blogging page</h1>
      <div className="flex ">
        {!user ? (
          <>
            <div
              className="cursor-pointer p-2 hover:bg-indigo-500 rounded-md flex"
              onClick={handleSignIn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4caf50"
                  d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                ></path>
                <path
                  fill="#1e88e5"
                  d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                ></path>
                <polygon
                  fill="#e53935"
                  points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                ></polygon>
                <path
                  fill="#c62828"
                  d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                ></path>
                <path
                  fill="#fbc02d"
                  d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                ></path>
              </svg>
              Gmail
            </div>
            <Link
              className="p-2 hover:bg-indigo-500 rounded-md"
              href={"/login"}
            >
              Login
            </Link>
            <Link
              className="p-2 hover:bg-indigo-500 rounded-md"
              href={"/signup"}
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <img
              src={auth.currentUser.photoURL || (userData && userData.imageUrl)}
              width={40}
              height={30}
              className="p-2 rounded-full"
            />
            <div className="p-2">{auth.currentUser.displayName || (userData && userData.username)}</div>
            <div className="cursor-pointer p-2" onClick={handleSignOut}>
              Signout
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
