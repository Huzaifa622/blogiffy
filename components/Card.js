import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { userAuthContext } from "@/context/AuthContext";
import { Timestamp } from "firebase/firestore";

function Card() {
  const currentDate = new Date().toISOString();
  // const isoDate = currentDate.toISOString();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState(false);
  const { user , userData } = userAuthContext();

  const postsCollectionRef = collection(db, "Blog");

  const createPost = async (e) => {
    e.preventDefault();
    const wordText = description.trim().length;
    if (wordText < 100) {
      return setText(true);
    } else {
      setText(false);
    }
    const ref = await addDoc(postsCollectionRef, {
      title,
      description,
      date: currentDate,
      author: {
        name: user.displayName || userData.username,
        id: user.uid || userData.uid,
        photo: user.photoURL || userData.imageUrl,
      },
    });
    setTitle("");
    setDescription("");
    console.log(ref.path);
  };

  return (
    <div className=" w-[80%] p-6 ml-12 mb-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a New Blog</h2>
      <form onSubmit={createPost}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            rows="4"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {text ? (
            <div className="text-red-800">blog must be atleast 100 words</div>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default Card;
