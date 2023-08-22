import { auth, db } from "@/utils/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const BlogCard = (props) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, "Blog", props.id));
  };
  // console.log(props.photo)
  const formatDate = new Date(props.date).toLocaleString();
  return (
    <div className="w-[80%] ml-12 mt-0 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{props.title}</h2>
        <p className="mt-2 text-gray-600">{props.description}</p>
        <div className="flex items-center mt-4">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={props.photo}
            alt="pic"
            width={20}
            height={20}
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {props.authorname}
            </p>
            <p className="text-sm text-gray-600">{formatDate} </p>
          </div>
        </div>
      </div>
      <button
        className="p-4 text-white bg-red-600 m-4 pt-1 pb-1 rounded-lg"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default BlogCard;
