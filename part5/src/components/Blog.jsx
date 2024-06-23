import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, owner, deleteBlog, likeBlog }) => {
  let user = blog.author || "Anonymous";
  let [view, setView] = useState("View");

  const viewDeets = () => {
    return () => {
      setView(view == "View" ? "hide" : "View");
    };
  };

  let hide = { display: view == "View" ? "none" : "" };

  console.log("Blog:", blog);

  return (
    <>
      <div className="blog">
        <h3>
          {blog.title}
          <button onClick={viewDeets()}>{view}</button>
        </h3>
        <div id="details" style={hide}>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes <button onClick={likeBlog(blog)}>like</button>
          </p>
        </div>
        <p>Author: {user}</p>
        {(owner === blog.user || owner === blog.user.id) && <button onClick={deleteBlog(blog)}>Delete</button>}
      </div>
    </>
  );
};

export default Blog;
