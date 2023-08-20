import Image from "next/image";
import { Inter } from "next/font/google";
import { userAuthContext } from "@/context/AuthContext";
import Card from "@/components/Card";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { auth, db } from "@/utils/firebase";
import HomeBlogs from "@/components/HomeBlogs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogsUser, setBlogsUser] = useState([]);

  useEffect(() => {
  

    
    if (auth.currentUser) {
      const fetchUserName = async () => {
        const q = query(
          collection(db, "users"),
          where("email", "==", auth.currentUser.email)
          );
          const querySnapshot = await getDocs(q);
          const userBlogList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBlogsUser(userBlogList);
          fetchUserName();
      };
      const fetchUserBlogs = async () => {
        const q = query(
          collection(db, "Blog"),
          where("author.id", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const userBlogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(userBlogList);
      };

      fetchUserBlogs();
    } else {
      const fetchBlogs = async () => {
        const blogsCollectionRef = collection(db, "Blog");
        const querySnapshot = await getDocs(blogsCollectionRef);
        const blogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllBlogs(blogList);
      };

      fetchBlogs();
    }
  });
  const { user } = userAuthContext();
  return (
    <>
      <div className="h-[5rem] bg-white  items-center flex justify-center ">
        {!user ? (
          <h1 className=" pr-[40rem] ">Good Morning Readers</h1>
        ) : (
          <>
            <h1 className=" pr-[40rem]  ">Dashboard</h1>
          </>
        )}
      </div>
      {!user ? (
        <div className=" h-full bg-slate-200">
          <h2 className="pl-56 font-bold">All Blogs</h2>
          {allBlogs.map((blog) => (
            <div className="mt-5 bg-slate-200">
             
              <HomeBlogs
                key={blog.id}
                title={blog.title}
                description={blog.description}
                authorname={
                  blog.author.name ||
                  blogsUser.map((user) => {
                    user.name;
                  })
                }
                date={blog.date}
                id={blog.id}
                photo={blog.photo}
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="w-[100%] pt-8 bg-slate-200 mb-4 h-full ">
            <Card />
            <div>
              {blogs.map((blog) => (
                <div className="mb-4" key={blog.id}>
                  <BlogCard
                    title={blog.title}
                    description={blog.description}
                    authorname={
                      blog.author.name ||
                      blogsUser.map((user) => {
                        user.name;
                      })
                    }
                    date={blog.date}
                    id={blog.id}
                    photo={blog.photo}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
