import React from "react";
import BlogCard from "./BlogCard";

const UserBlog = (props) => {
  return (
    <div className="bg-slate-200 h-full">
      <div className="mb-4 " key={props.id}>
        <BlogCard
          title={props.title}
          description={props.description}
          authorname={props.authorname}
          date={props.date}
          id={props.id}
          photo={props.photo}
        />
      </div>
    </div>
  );
};

export default UserBlog;
