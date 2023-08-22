import Image from "next/image";
import { Inter } from "next/font/google";
import { userAuthContext } from "@/context/AuthContext";
import Card from "@/components/Card";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { auth, db } from "@/utils/firebase";
import HomeBlogs from "@/components/HomeBlogs";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import UserBlog from "@/components/UserBlog";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { blogList } = props;
  console.log(blogList);
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [blogsUser, setBlogsUser] = useState([]);
  const { user } = userAuthContext();

  useEffect(() => {
    if (user) {
      const fetchUserBlogs = async () => {
        const q = query(
          collection(db, "Blog"),
          where("author.id", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userBlogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(userBlogList);
        setBlogs(userBlogList);
      };
      fetchUserBlogs();
    }
    // const fetchBlogs = async () => {
    //   const blogsCollectionRef = collection(db, "Blog");
    //   const querySnapshot = await getDocs(blogsCollectionRef);
    //   const blogList = querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setAllBlogs(blogList);
    // };

    // fetchBlogs();
  });

  return (
    <>
      <div className="h-[5rem] bg-white  items-center flex justify-center ">
        {!user ? (
          <h1 className=" pr-[40rem] ">Good Morning Readers</h1>
        ) : (
          <>
            <h1 className=" pr-[52rem]  ">Dashboard</h1>
          </>
        )}
      </div>
      {!user ? (
        <div className=" h-full bg-slate-200">
          <h2 className="pl-56 font-bold">All Blogs</h2>
          {blogList.map((blog) => (
            <Link href={`/${blog.id}`} className="mt-5 h-full bg-slate-200">
              <HomeBlogs
                key={blog.id}
                title={blog.title}
                description={blog.description}
                authorname={blog.author.name}
                date={blog.date}
                id={blog.id}
                photo={blog.author.photo}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <div className="w-[100%] pt-8 bg-slate-200 mb-4 h-screen ">
          <Card />
          {blogs.map((blog) => (
            <UserBlog
              title={blog.title}
              description={blog.description}
              authorname={blog.author.name}
              id={blog.id}
              photo={blog.author.photo}
              date={blog.date}
            />
          ))}
          </div>
        </div>
      )}
    </>
  );
}
export async function getStaticProps() {
  const blogsCollectionRef = collection(db, "Blog");
  const querySnapshot = await getDocs(blogsCollectionRef);
  let blogList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  blogList = JSON.parse(JSON.stringify(blogList));
  return {
    props: { blogList },
    revalidate: 10,
  };
}
