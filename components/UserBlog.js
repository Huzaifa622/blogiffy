import React from "react";
import BlogCard from "./BlogCard";
import { userAuthContext } from "@/context/AuthContext";

const UserBlog = (props) => {
  const {userData } = userAuthContext();
  return (
    <div className=" mb-7">
      <div className=" " key={props.id}>
        <BlogCard
          title={props.title}
          description={props.description}
          authorname={props.authorname ||(userData &&  userData.username)}
          date={props.date}
          id={props.id}
          photo={props.photo||(userData &&  userData.imageUrl)}
        />
      </div>
    </div>
  );
};

export default UserBlog;
