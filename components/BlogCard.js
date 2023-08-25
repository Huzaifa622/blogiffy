import { auth, db } from "@/utils/firebase";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PopupForm from "./PopupForm";

const BlogCard = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = async(data) => {
 await updateDoc(doc (db, 'Blog' , props.id) , {
  title :data.title,
  description : data.description
 })
    // You can perform further actions with the submitted data, such as sending it to a server or updating state.
  };
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
      <div className="flex">
      <button
        className="p-4 text-white bg-red-500 hover:bg-red-600 m-4 pt-1 pb-1 rounded-lg"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button className="p-4 text-white bg-blue-500 hover:bg-blue-600 m-4 pt-1 pb-1 rounded-lg"
        onClick={()=>openPopup()}
      >Edit
      </button>
      <PopupForm isOpen={isPopupOpen} onClose={closePopup} onSubmit={handleFormSubmit}/>
      </div>
    </div>
  );
};

export default BlogCard;
